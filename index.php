<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="ref" content="<?= wp_create_nonce('touriends_ref') ?>">
    <title>Touriends Frontend</title>
	<base href="<?= home_url() ?>">
    <?php wp_head() ?>
    <script>
	    var locale_url = '<?= get_stylesheet_directory_uri() . '/app/l10n' ?>';
	    var ajax_url = `<?= admin_url('admin-ajax.php') ?>`;
	    var aaa =<?= is_user_logged_in() ?
		    'true' : 'false' ?>;
	    var bbb =<?= is_user_logged_in() ?
		    '\'' . wp_get_current_user()->user_login . '\'' : 'null' ?>;
	    var ccc =<?= is_user_logged_in() ?
		    '\'' . get_user_meta(wp_get_current_user()->ID, 'user_nation', true) . '\'' : "''" ?>;
    </script>
</head>
<body ng-app="touriends">

<loading-overlay class="super-overlay"></loading-overlay>
<toast-overlay class="super-overlay"></toast-overlay>
<ui-view></ui-view>

<?php wp_footer() ?>
</body>
</html>