#!/bin/bash
# Fix admin login for PS2-Era-Forum

echo "🔧 Fixing admin login credentials..."

# Create a PHP script to properly hash the password
docker-compose exec -T ps2-era-forum bash -c "
cat > /tmp/fix_password.php << 'EOF'
<?php
// Load WordPress
require_once('/var/www/html/wp-config.php');
require_once('/var/www/html/wp-includes/wp-db.php');
require_once('/var/www/html/wp-includes/functions.php');
require_once('/var/www/html/wp-includes/pluggable.php');

// Create WordPress database connection
\$wpdb = new wpdb('wordpress', 'wordpress', 'wordpress', 'ps2-era-forum-db');

// Hash the password properly
\$password = 'PS2Admin2024!';
\$hashed_password = wp_hash_password(\$password);

// Update the admin user
\$result = \$wpdb->update(
    'wp_users',
    array('user_pass' => \$hashed_password),
    array('user_login' => 'admin')
);

if (\$result !== false) {
    echo \"Admin password updated successfully!\n\";
    echo \"Username: admin\n\";
    echo \"Password: PS2Admin2024!\n\";
} else {
    echo \"Error updating password\n\";
}
EOF

php /tmp/fix_password.php
rm /tmp/fix_password.php
"

echo ""
echo "✅ Admin login fixed!"
echo ""
echo "🔐 Login Details:"
echo "URL: http://localhost:8030/wp-admin"
echo "Username: admin"
echo "Password: PS2Admin2024!"
echo ""
echo "Try logging in now!"