#!/bin/bash
# Install forum features automatically

echo "🔌 Installing bbPress forum plugin..."

# Download and install bbPress
docker-compose exec -T ps2-era-forum bash -c "
  cd /var/www/html/wp-content/plugins
  if [ ! -d 'bbpress' ]; then
    curl -L https://downloads.wordpress.org/plugin/bbpress.2.6.11.zip -o bbpress.zip
    unzip -q bbpress.zip
    rm bbpress.zip
    chown -R www-data:www-data bbpress
  fi
"

echo "✅ bbPress plugin downloaded!"
echo ""
echo "🎯 To complete setup:"
echo "1. Visit: http://localhost:8030/wp-admin"
echo "2. Login with: admin / PS2Admin2024!"
echo "3. Go to Plugins → Installed Plugins"
echo "4. Activate 'bbPress' plugin"
echo "5. Go to Forums → Settings to configure"
echo ""
echo "🎮 Your PS2-Era-Forum is ready for users!"