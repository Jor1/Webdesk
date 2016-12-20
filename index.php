<?php
defined('YII_DEBUG') or define('YII_DEBUG', isset($_SERVER['YII_DEBUG']) ? $_SERVER['YII_DEBUG'] : true);
defined('YII_ENV') or define('YII_ENV', isset($_SERVER['YII_ENV']) ? $_SERVER['YII_ENV'] : 'dev');

require(__DIR__ . '/../../vendor/autoload.php');
require(__DIR__ . '/../../vendor/yiisoft/yii2/Yii.php');
require(__DIR__ . '/../../common/config/bootstrap.php');
require(__DIR__ . '/../../common/config/constants.php');
require(__DIR__ . '/../config/bootstrap.php');
require(__DIR__ . '/../config/constants.php');
require(__DIR__ . '/../../environments/' . YII_ENV . '/common/config/constants.php');
require(__DIR__ . '/../../environments/' . YII_ENV . '/frontend/config/constants.php');

$config = yii\helpers\ArrayHelper::merge(
    require(__DIR__ . '/../../common/config/main.php'),
    require(__DIR__ . '/../../environments/' . YII_ENV . '/common/config/main-local.php'),
    require(__DIR__ . '/../config/main.php'),
    require(__DIR__ . '/../../environments/' . YII_ENV . '/frontend/config/main-local.php')
);

$application = new yii\web\Application($config);
$application->run();
