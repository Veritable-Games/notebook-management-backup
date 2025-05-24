/**
 * Error Handler Utility
 * 
 * Standardized error handling for all Veritable Games services
 * Features:
 * - Custom error classes
 * - Structured error responses
 * - Error-code mapping
 * - Error middleware for Express
 */

/**
 * Base application error
 */
class AppError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
  
  /**
   * Format error for JSON response
   */
  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        ...(this.details && { details: this.details })
      }
    };
  }
}

/**
 * 400 Bad Request Error
 */
class BadRequestError extends AppError {
  constructor(message, code = 'BAD_REQUEST', details = null) {
    super(message, 400, code, details);
  }
}

/**
 * 401 Unauthorized Error
 */
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code = 'UNAUTHORIZED', details = null) {
    super(message, 401, code, details);
  }
}

/**
 * 403 Forbidden Error
 */
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', code = 'FORBIDDEN', details = null) {
    super(message, 403, code, details);
  }
}

/**
 * 404 Not Found Error
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found', code = 'NOT_FOUND', details = null) {
    super(message, 404, code, details);
  }
}

/**
 * 409 Conflict Error
 */
class ConflictError extends AppError {
  constructor(message = 'Resource conflict', code = 'CONFLICT', details = null) {
    super(message, 409, code, details);
  }
}

/**
 * 429 Too Many Requests Error
 */
class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', code = 'TOO_MANY_REQUESTS', details = null) {
    super(message, 429, code, details);
  }
}

/**
 * 500 Internal Server Error
 */
class InternalServerError extends AppError {
  constructor(message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR', details = null) {
    super(message, 500, code, details);
  }
}

/**
 * 502 Bad Gateway Error
 */
class BadGatewayError extends AppError {
  constructor(message = 'Bad gateway', code = 'BAD_GATEWAY', details = null) {
    super(message, 502, code, details);
  }
}

/**
 * 503 Service Unavailable Error
 */
class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable', code = 'SERVICE_UNAVAILABLE', details = null) {
    super(message, 503, code, details);
  }
}

/**
 * 504 Gateway Timeout Error
 */
class GatewayTimeoutError extends AppError {
  constructor(message = 'Gateway timeout', code = 'GATEWAY_TIMEOUT', details = null) {
    super(message, 504, code, details);
  }
}

/**
 * Error handling middleware for Express
 * @param {Object} logger - Logger instance
 * @returns {Function} Express middleware
 */
function errorMiddleware(logger) {
  return (err, req, res, next) => {
    // If the error is one of our application errors, use it directly
    if (err instanceof AppError) {
      // Log the error
      logger.error(`${err.name}: ${err.message}`, {
        code: err.code,
        statusCode: err.statusCode,
        details: err.details,
        stack: err.stack,
        request: {
          method: req.method,
          url: req.originalUrl || req.url,
          requestId: req.requestId
        }
      });
      
      // Send error response
      return res.status(err.statusCode).json(err.toJSON());
    }
    
    // Handle other types of errors
    // Default to internal server error for unhandled errors
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    
    // Log the error
    logger.error(`Unhandled error: ${err.message}`, {
      code,
      statusCode,
      stack: err.stack,
      request: {
        method: req.method,
        url: req.originalUrl || req.url,
        requestId: req.requestId
      }
    });
    
    // Send error response
    res.status(statusCode).json({
      error: {
        message: statusCode === 500 ? 'Internal server error' : err.message,
        code,
        requestId: req.requestId
      }
    });
  };
}

/**
 * Async error handler for route handlers
 * Wraps an async route handler to catch errors and pass them to the next middleware
 * @param {Function} fn - Async route handler
 * @returns {Function} Express middleware
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Circuit breaker for external service calls
 * @param {Object} options - Circuit breaker options
 * @param {number} options.failureThreshold - Number of failures before circuit opens
 * @param {number} options.resetTimeout - Time in ms before circuit half-opens
 * @param {Function} options.fallbackFn - Function to call when circuit is open
 * @returns {Function} Circuit breaker function
 */
function circuitBreaker({ failureThreshold = 5, resetTimeout = 30000, fallbackFn = null }) {
  let failures = 0;
  let lastFailureTime = null;
  let isCircuitOpen = false;
  
  return async function breaker(fn, fallback = null) {
    // If circuit is open
    if (isCircuitOpen) {
      // Check if reset timeout has passed
      const now = Date.now();
      if (lastFailureTime && (now - lastFailureTime) > resetTimeout) {
        // Half-open circuit
        isCircuitOpen = false;
        failures = 0;
      } else {
        // Circuit still open, use fallback
        return (fallback || fallbackFn || (() => {
          throw new ServiceUnavailableError('Service is unavailable', 'CIRCUIT_OPEN');
        }))();
      }
    }
    
    try {
      // Execute function
      const result = await fn();
      
      // Success, reset failure count
      failures = 0;
      return result;
    } catch (error) {
      // Increment failure count
      failures++;
      lastFailureTime = Date.now();
      
      // Check if threshold reached
      if (failures >= failureThreshold) {
        isCircuitOpen = true;
      }
      
      // Re-throw the error
      throw error;
    }
  };
}

// Export error classes and utilities
module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  TooManyRequestsError,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  errorMiddleware,
  asyncHandler,
  circuitBreaker
};