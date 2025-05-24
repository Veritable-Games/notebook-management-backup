/**
 * Central Configuration Module
 * 
 * Provides a unified way to access configuration throughout the application
 */

const path = require('path');
const fs = require('fs');

// Base paths
const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'data');
const CONFIG_DIR = path.join(REPO_ROOT, 'config');
const LOGS_DIR = path.join(REPO_ROOT, 'logs');
const PIDS_DIR = path.join(REPO_ROOT, 'pids');

// Create essential directories if they don't exist
[DATA_DIR, CONFIG_DIR, LOGS_DIR, PIDS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Load service-specific configuration
const loadServiceConfig = (serviceName) => {
  const configPath = path.join(CONFIG_DIR, 'services', `${serviceName}.json`);
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.error(`Error loading config for ${serviceName}:`, error);
      return {};
    }
  }
  return {};
};

// Load all services configuration
const loadServicesConfig = () => {
  const servicesPath = path.join(CONFIG_DIR, 'services', 'services.json');
  if (fs.existsSync(servicesPath)) {
    try {
      return JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
    } catch (error) {
      console.error('Error loading services config:', error);
      return { services: {} };
    }
  }
  return { services: {} };
};

// Environment-aware configuration getter
const getConfig = (serviceName) => {
  // Default configuration
  const defaultConfig = {
    environment: NODE_ENV,
    logLevel: process.env.LOG_LEVEL || 'info',
    paths: {
      root: REPO_ROOT,
      data: DATA_DIR,
      config: CONFIG_DIR,
      logs: LOGS_DIR,
      pids: PIDS_DIR
    }
  };
  
  // Service-specific configuration
  const serviceConfig = serviceName ? loadServiceConfig(serviceName) : {};
  
  // Environment-specific overrides
  const envConfig = {};
  
  // Merge configurations with precedence
  return {
    ...defaultConfig,
    ...serviceConfig,
    ...envConfig
  };
};

module.exports = {
  getConfig,
  loadServicesConfig,
  paths: {
    root: REPO_ROOT,
    data: DATA_DIR,
    config: CONFIG_DIR,
    logs: LOGS_DIR,
    pids: PIDS_DIR
  },
  environment: NODE_ENV
};