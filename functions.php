<?php

add_action('init', function() {
	if (! is_admin()) {
		wp_deregister_script('wp-embed');
	}
});

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/app/style.css', false, '0.0.1');

    wp_enqueue_script('jquery');
    wp_enqueue_script('angular', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js',
	    false, false, true);
    wp_enqueue_script('angular-animate', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular-animate.js',
	    false, false, true);
    wp_enqueue_script('bundle', get_stylesheet_directory_uri() . '/app/bundle.js', false, '0.0.1', true);
});

add_filter('show_admin_bar', '__return_false'); // Remove admin bar even if the user is an admin

add_filter('emoji_svg_url', '__return_false');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');