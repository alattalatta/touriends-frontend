<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Touriends Frontend</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
<!--    <base href="--><?//= home_url('') ?><!--/tour/front/">-->
    <?php wp_head() ?>
</head>
<body ng-app="touriends">

<a ui-sref="main">Main</a>
<a ui-sref="home">Home</a>
<a ui-sref="group">Group</a>
<ui-view></ui-view>

<?php wp_footer() ?>
</body>
</html>