#!/bin/bash

# Setup script for automated backups

echo "Setting up automated content backups..."

# Create logs directory
mkdir -p "/home/user/Repository/logs"
mkdir -p "/home/user/Repository/backups"

echo "✓ Created backup directories"

# Test the backup script
echo "Testing backup script..."
if /home/user/Repository/scripts/backup-content.sh; then
    echo "✓ Backup script test successful"
else
    echo "✗ Backup script test failed"
    exit 1
fi

# Setup systemd timer (optional)
echo ""
echo "To setup automated daily backups, run these commands:"
echo "  sudo cp /home/user/Repository/scripts/auto-backup.service /etc/systemd/system/"
echo "  sudo cp /home/user/Repository/scripts/auto-backup.timer /etc/systemd/system/"
echo "  sudo systemctl daemon-reload"
echo "  sudo systemctl enable auto-backup.timer"
echo "  sudo systemctl start auto-backup.timer"
echo ""

# Setup cron alternative
echo "Alternative: Add to crontab for user backups:"
echo "  crontab -e"
echo "  Add line: 0 2 * * * /home/user/Repository/scripts/backup-content.sh"
echo ""

echo "✓ Automated backup system configured!"
echo "  Manual backup: /home/user/Repository/scripts/backup-content.sh"
echo "  Backups location: /home/user/Repository/backups/"
echo "  Logs: /home/user/Repository/logs/backup.log"