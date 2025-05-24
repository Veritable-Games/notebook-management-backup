#!/bin/bash
# Automated PS2-Era-Forum WordPress Setup

echo "🎮 Setting up PS2-Era-Forum WordPress installation..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 10

# Download and install WordPress via curl
echo "📥 Installing WordPress..."
docker-compose exec -T ps2-era-forum bash -c "
  cd /var/www/html
  if [ ! -f wp-config.php ]; then
    # Download WordPress config setup
    curl -d 'dbname=wordpress&uname=wordpress&pwd=wordpress&dbhost=ps2-era-forum-db&prefix=wp_&submit=Submit' \
         -X POST \
         http://localhost/wp-admin/setup-config.php?step=2 > /dev/null 2>&1
    
    # Create wp-config.php manually
    cat > wp-config.php << 'EOF'
<?php
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wordpress' );
define( 'DB_PASSWORD', 'wordpress' );
define( 'DB_HOST', 'ps2-era-forum-db' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

\$table_prefix = 'wp_';
define( 'WP_DEBUG', false );

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
EOF
  fi
"

echo "🔧 Installing WordPress via HTTP..."
# Install WordPress with curl
curl -d 'weblog_title=PS2+Era+Gaming+Forum&user_name=admin&admin_password=PS2Admin2024!&admin_password2=PS2Admin2024!&admin_email=admin@ps2forum.local&blog_public=1&submit=Install+WordPress' \
     -X POST \
     http://localhost:8030/wp-admin/install.php?step=2

echo ""
echo "✅ PS2-Era-Forum setup complete!"
echo ""
echo "🌐 Forum URL: http://localhost:8030"
echo "🔐 Admin URL: http://localhost:8030/wp-admin"
echo "👤 Username: admin"
echo "🔑 Password: PS2Admin2024!"
echo "📧 Email: admin@ps2forum.local"
echo ""
echo "Next: Install bbPress plugin for forum functionality"