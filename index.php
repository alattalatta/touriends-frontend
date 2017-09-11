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
        var ajax_url=`<?= admin_url('admin-ajax.php') ?>`;
        var logged=<?= is_user_logged_in() ? 'true' : 'false' ?>;
        var uid=<?= is_user_logged_in() ? wp_get_current_user()->ID : 'null' ?>;
    </script>
</head>
<body ng-app="touriends">

<a ui-sref="home">Force home</a>
<ui-view></ui-view>

<?php wp_footer() ?>
</body>
</html>