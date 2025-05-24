<?php
/**
 * Plugin Name: PS2-Era Forum Feedback System
 * Description: Multi-dimensional feedback system for forum posts
 * Version: 1.0
 * Author: Your Name
 */

// Make sure we don't expose any info if called directly
if (!defined('ABSPATH')) {
    exit;
}

class PS2_Forum_Feedback {
    public function __construct() {
        // Create custom tables on activation
        register_activation_hook(__FILE__, array($this, 'create_tables'));
        
        // Register REST API routes
        add_action('rest_api_init', array($this, 'register_routes'));
    }
    
    public function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $post_feedback_table = $wpdb->prefix . 'post_feedback';
        $post_tags_table = $wpdb->prefix . 'post_tags';
        
        $sql = "CREATE TABLE $post_feedback_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            user_id bigint(20) NOT NULL,
            dimension_id varchar(50) NOT NULL,
            value int(11) NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY unique_feedback (post_id,user_id,dimension_id)
        ) $charset_collate;
        
        CREATE TABLE $post_tags_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            tag_id varchar(50) NOT NULL,
            user_id bigint(20) NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY unique_tag (post_id,tag_id,user_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function register_routes() {
        // Register dimension feedback route
        register_rest_route('forum-feedback/v1', '/dimension', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_dimension_feedback'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        // Add more routes as needed
    }
    
    public function check_permissions() {
        return is_user_logged_in();
    }
    
    public function save_dimension_feedback($request) {
        // Implement this function to save dimension feedback
        // This is a placeholder
        return new WP_REST_Response(array('success' => true), 200);
    }
}

// Initialize the plugin
$ps2_forum_feedback = new PS2_Forum_Feedback();
