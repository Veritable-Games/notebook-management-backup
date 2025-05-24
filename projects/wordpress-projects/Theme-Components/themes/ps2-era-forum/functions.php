<?php
// Theme setup
function ps2_era_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'ps2-era-forum'),
        'footer' => __('Footer Menu', 'ps2-era-forum'),
    ));
}
add_action('after_setup_theme', 'ps2_era_theme_setup');

// Enqueue scripts and styles
function ps2_era_scripts() {
    wp_enqueue_style('ps2-era-style', get_stylesheet_uri());
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
    
    wp_enqueue_script('ps2-era-feedback', get_template_directory_uri() . '/js/feedback-system.js', array('jquery'), '1.0', true);
    
    // Pass WordPress data to JavaScript
    wp_localize_script('ps2-era-feedback', 'wpApiSettings', array(
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'currentUserId' => get_current_user_id()
    ));
}
add_action('wp_enqueue_scripts', 'ps2_era_scripts');
