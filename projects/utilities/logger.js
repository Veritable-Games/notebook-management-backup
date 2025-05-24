/**
 * Standardized Logger
 * 
 * A consistent logging utility for all Veritable Games services
 * Features:
 * - Log levels: debug, info, warn, error
 * - JSON structured logging
 * - File and console output
 * - Service name context
 * - Request ID tracking
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Default configuration
const DEFAULT_CONFIG = {
  level: 'info', // debug, info, warn, error
  service: 'unknown',
  console: true,
  file: true,
  logDir: path.join(process.cwd(), '..', 'logs'),
  filename: null, // Will default to service name
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  format: 'text' // text or json
};

// Log levels and their priority
const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

class Logger {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    // Set default filename based on service name if not provided
    if (!this.config.filename) {
      this.config.filename = `${this.config.service}.log`;
    }
    
    // Set full path to log file
    this.logFile = path.join(this.config.logDir, this.config.filename);
    
    // Create log directory if it doesn't exist
    if (this.config.file && !fs.existsSync(this.config.logDir)) {
      fs.mkdirSync(this.config.logDir, { recursive: true });
    }
    
    // Bind log methods
    this.debug = this._log.bind(this, 'debug');
    this.info = this._log.bind(this, 'info');
    this.warn = this._log.bind(this, 'warn');
    this.error = this._log.bind(this, 'error');
    
    // Request context storage
    this.requestContext = new Map();
  }
  
  /**
   * Internal logging method
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} data - Additional log data
   * @param {string} [requestId] - Request ID for context
   */
  _log(level, message, data = null, requestId = null) {
    // Check if this log level should be logged
    if (LOG_LEVELS[level] < LOG_LEVELS[this.config.level]) {
      return;
    }
    
    // Create log entry
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      service: this.config.service,
      message,
      ...(data && { data }),
      ...(requestId && { requestId })
    };
    
    let formattedEntry;
    
    if (this.config.format === 'json') {
      formattedEntry = JSON.stringify(logEntry);
    } else {
      formattedEntry = `[${timestamp}] [${level.toUpperCase()}] [${this.config.service}]${requestId ? ` [${requestId}]` : ''} ${message}${data ? '\n' + JSON.stringify(data, null, 2) : ''}`;
    }
    
    // Log to console
    if (this.config.console) {
      const consoleMethod = level === 'error' ? console.error : console.log;
      consoleMethod(formattedEntry);
    }
    
    // Log to file
    if (this.config.file) {
      try {
        // Check log rotation
        this._checkRotation();
        
        // Append to log file
        fs.appendFileSync(this.logFile, formattedEntry + '\n');
      } catch (error) {
        console.error(`Failed to write to log file: ${error.message}`);
      }
    }
  }
  
  /**
   * Check if log rotation is needed and perform it if necessary
   */
  _checkRotation() {
    try {
      if (!fs.existsSync(this.logFile)) {
        return;
      }
      
      const stats = fs.statSync(this.logFile);
      
      if (stats.size >= this.config.maxSize) {
        // Perform log rotation
        for (let i = this.config.maxFiles - 1; i > 0; i--) {
          const oldFile = `${this.logFile}.${i}`;
          const newFile = `${this.logFile}.${i + 1}`;
          
          if (fs.existsSync(oldFile)) {
            fs.renameSync(oldFile, newFile);
          }
        }
        
        // Rename current log to .1
        fs.renameSync(this.logFile, `${this.logFile}.1`);
      }
    } catch (error) {
      console.error(`Failed to rotate log file: ${error.message}`);
    }
  }
  
  /**
   * Creates a middleware function for Express request logging
   * @returns {Function} Express middleware function
   */
  middleware() {
    return (req, res, next) => {
      // Generate a unique ID for this request
      const requestId = uuidv4();
      
      // Start time for calculating response time
      const startTime = Date.now();
      
      // Store request ID in request object
      req.requestId = requestId;
      
      // Store the original end function
      const originalEnd = res.end;
      
      // Override end function to log response
      res.end = (...args) => {
        // Calculate response time
        const responseTime = Date.now() - startTime;
        
        // Log request
        this.info(`${req.method} ${req.originalUrl || req.url} ${res.statusCode} ${responseTime}ms`, {
          method: req.method,
          url: req.originalUrl || req.url,
          statusCode: res.statusCode,
          responseTime,
          userAgent: req.headers['user-agent'],
          contentLength: res.getHeader('content-length'),
          ip: req.ip || req.connection.remoteAddress
        }, requestId);
        
        // Call original end function
        return originalEnd.apply(res, args);
      };
      
      // Continue with request
      next();
    };
  }
  
  /**
   * Creates a middleware function for error handling
   * @returns {Function} Express error middleware function
   */
  errorMiddleware() {
    return (err, req, res, next) => {
      // Log error
      this.error(`Error: ${err.message}`, {
        stack: err.stack,
        method: req.method,
        url: req.originalUrl || req.url
      }, req.requestId);
      
      // Send error response
      res.status(err.status || 500).json({
        error: {
          message: err.message,
          code: err.code || 'INTERNAL_SERVER_ERROR',
          requestId: req.requestId
        }
      });
    };
  }
  
  /**
   * Creates a middleware for adding a child logger to the request
   * This allows for request-scoped logging with request ID context
   * @returns {Function} Express middleware function
   */
  requestLoggerMiddleware() {
    return (req, res, next) => {
      // Create request logger methods
      req.logger = {
        debug: (message, data) => this.debug(message, data, req.requestId),
        info: (message, data) => this.info(message, data, req.requestId),
        warn: (message, data) => this.warn(message, data, req.requestId),
        error: (message, data) => this.error(message, data, req.requestId)
      };
      
      next();
    };
  }
}

// Export factory function
module.exports = function createLogger(config) {
  return new Logger(config);
};