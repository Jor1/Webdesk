<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
<body>

<?php
echo "我的第一段 PHP 脚本！";
?>
<?php
  $data = array("现代"=>"上海","文化"=>"西安","首都"=>"北京");
 
  //将数组存到指定的text文件中
  file_put_contents("data/dt.txt",json_encode($data));
  //获取数据
  $datas = json_decode(file_get_contents("data/dt.txt"));
  print_r($datas);
?>

</body>
</html>