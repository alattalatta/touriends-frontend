<?php

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script('bundle', get_stylesheet_directory_uri() . '/app/bundle.js', false, false, true);
});

add_filter('show_admin_bar', '__return_false'); // Remove admin bar even if the user is an admin

add_filter('emoji_svg_url', '__return_false');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');