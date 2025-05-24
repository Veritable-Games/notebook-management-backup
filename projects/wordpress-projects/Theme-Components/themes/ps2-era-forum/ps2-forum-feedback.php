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
        
        // Register tag routes
        register_rest_route('forum-feedback/v1', '/tag', array(
            'methods' => 'POST',
            'callback' => array($this, 'add_tag'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        register_rest_route('forum-feedback/v1', '/tag', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'remove_tag'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        // Register feedback data retrieval route
        register_rest_route('forum-feedback/v1', '/post/(?P<post_id>\d+)/feedback', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_post_feedback'),
            'permission_callback' => '__return_true'
        ));
        
        // Register tag data retrieval route
        register_rest_route('forum-feedback/v1', '/post/(?P<post_id>\d+)/tags', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_post_tags'),
            'permission_callback' => '__return_true'
        ));
    }
    
    public function check_permissions() {
        return is_user_logged_in();
    }
    
    public function save_dimension_feedback($request) {
        global $wpdb;
        
        $params = $request->get_params();
        
        if (!isset($params['post_id']) || !isset($params['dimension_id']) || !isset($params['value'])) {
            return new WP_Error('missing_params', 'Missing required parameters', array('status' => 400));
        }
        
        $post_id = intval($params['post_id']);
        $dimension_id = sanitize_text_field($params['dimension_id']);
        $value = intval($params['value']);
        $user_id = get_current_user_id();
        
        $table = $wpdb->prefix . 'post_feedback';
        
        $result = $wpdb->replace(
            $table,
            array(
                'post_id' => $post_id,
                'user_id' => $user_id,
                'dimension_id' => $dimension_id,
                'value' => $value
            ),
            array('%d', '%d', '%s', '%d')
        );
        
        if ($result === false) {
            return new WP_Error('db_error', 'Could not save feedback', array('status' => 500));
        }
        
        return array('success' => true);
    }
    
    public function add_tag($request) {
        global $wpdb;
        
        $params = $request->get_params();
        
        if (!isset($params['post_id']) || !isset($params['tag_id'])) {
            return new WP_Error('missing_params', 'Missing required parameters', array('status' => 400));
        }
        
        $post_id = intval($params['post_id']);
        $tag_id = sanitize_text_field($params['tag_id']);
        $user_id = get_current_user_id();
        
        $table = $wpdb->prefix . 'post_tags';
        
        $result = $wpdb->replace(
            $table,
            array(
                'post_id' => $post_id,
                'user_id' => $user_id,
                'tag_id' => $tag_id
            ),
            array('%d', '%d', '%s')
        );
        
        if ($result === false) {
            return new WP_Error('db_error', 'Could not add tag', array('status' => 500));
        }
        
        return array('success' => true);
    }
    
    public function remove_tag($request) {
        global $wpdb;
        
        $params = $request->get_params();
        
        if (!isset($params['post_id']) || !isset($params['tag_id'])) {
            return new WP_Error('missing_params', 'Missing required parameters', array('status' => 400));
        }
        
        $post_id = intval($params['post_id']);
        $tag_id = sanitize_text_field($params['tag_id']);
        $user_id = get_current_user_id();
