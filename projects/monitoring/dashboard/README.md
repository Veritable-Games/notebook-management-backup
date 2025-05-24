# Monitoring Dashboard

Web-based dashboard for monitoring services and applications.

## Features

- Real-time status display
- Historical logs
- Custom alerts
- Service control interface

## Components

- `dashboard.html`: Main dashboard interface
- `status.json`: Current service status data
- `logs/`: Service-specific logs

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dashboard:
   ```bash
   npm start
   ```

3. Access the dashboard:
   ```
   http://localhost:9090/
   ```

## Configuration

Edit the `status.json` file to configure monitored services:

```json
{
  "name": "Service Name",
  "url": "http://localhost:3000/",
  "logFile": "/path/to/log/file.log"
}
```