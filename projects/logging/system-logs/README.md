# Application Logs

Central location for all application and service logs.

## Log Categories

- `CM-Backend.log`: Content Management backend service logs
- `CM-Frontend.log`: Content Management frontend service logs
- `CV-Backend.log`: Constellation Viewer backend service logs
- `CV-Frontend.log`: Constellation Viewer frontend service logs

## Log Management

Logs are automatically created and updated by services when they run. Log files follow these naming conventions:

- `[Service Abbreviation]-[Component].log`: Main service logs
- `[Service Abbreviation]-[Component]-install.log`: Installation logs
- `[Service Abbreviation]-[Component]-permissions.log`: Permission-related logs

## Viewing Logs

You can view logs using standard tools:

```bash
# View entire log
cat logs/CV-Backend.log

# View last 50 lines
tail -n 50 logs/CV-Backend.log

# Follow log updates in real-time
tail -f logs/CV-Backend.log
```

## Log Rotation

Logs are manually managed. Consider implementing a log rotation strategy for production deployments.