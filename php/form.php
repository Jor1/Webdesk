<?php
 
if($_POST['submit']){
    //打开文件
    $fh = fopen('data/a.txt',a);
    //写入内容
    if($fh){
        $length = fwrite($fh,$_POST['content']."\r\n");
        if($length){
            echo '写入成功';
        }else{
            echo '写入失败';
        }
        fclose($fh);
    }else{
        echo '打开文件出错了';
    }
    $file = 'data/a.txt';
    $content = file_get_contents($file); //读取文件中的内容
    echo $content;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
<head>
    <title>文本框数据写入文本文件</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <script type="text/javascript">
 
    </script>
</head>
    <body>
        <form name = 'frmTxt' action = '' method = 'post'>
            <input type = 'text' name = 'content'></input>
            <input type = 'submit' name = 'submit' value = '提交' />
        </form>
    </body>
</html>