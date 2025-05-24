# Quick Reference

## Common Commands

| To do this... | Run this command |
|---------------|------------------|
| Start everything | `./start-all.sh` |
| Stop everything | `./stop-all.sh` |
| Restart everything | `./restart-all.sh` |
| Check what's running | `./service-manager.sh status` |
| Start one service | `./service-manager.sh start service-name` |
| Stop one service | `./service-manager.sh stop service-name` |

## Web Applications

| Application | URL | Description |
|-------------|-----|-------------|
| Wiki Viewer | http://localhost:8081/ | Browse and edit wiki pages and notebooks |
| Relationship View | http://localhost:8081/relationships | View relationships between content |
| Content Manager | http://localhost:3002/ | Manage and organize content |
| Monitoring | http://localhost:9090/dashboard | Monitor service health |

## Important Files

| File | Purpose |
|------|---------|
| GETTING_STARTED.md | Simple guide to get started |
| notebooks/INDEX.md | Index of available notebooks |
| config/services/services.json | Service configuration |
| logs/*.log | Log files for troubleshooting |

## Notebooks

| Content Type | Location |
|--------------|----------|
| Game Design Docs | notebooks/game-projects/ |
| Reference Materials | notebooks/reference/ |
| Mixed Notes | notebooks/All of it Anything Everything At Once/ |