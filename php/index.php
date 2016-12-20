<?php
 
if($_POST['submit']){
    //打开文件
    $fh = fopen('data/a.txt',a);
    //写入内容
    if($fh){
        $length = fwrite($fh,$_POST['name1']."\r\n");
        $length2 = fwrite($fh,$_POST['name2']."\r\n");
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
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
		<style>
			body{
				font-family: "微软雅黑"
			}
			.desk{
				
			}
			.card{
				width: 124px;
				height: 185px;
				margin: 30px 20px;
				display: inline-block;
				text-align: center;
				color: #fff;
				font-size: 20px;
				padding-top: 20px;
				background-image: url(img/878963_140313104512_1.jpg);
				background-size: cover;
				box-sizing: border-box;
				position: relative;
				vertical-align: top;
			}
			.card input:first-child{
				position: absolute;
				bottom: -20px;
				left: 0px;
				width: 120px;
				font-size: 15px;
				text-align: center;
			}
			.card input:last-child{
				position: absolute;
				bottom: -40px;
				left: 0px;
				width: 120px;
				font-size: 15px;
				text-align: center;
			}
			.namep{
				margin-top:100px; 
			}
		</style>
	</head>
	<body>
		选择人数
		<div class="number">
			<input name="nb" type="radio" value="5"/>5人
			<input name="nb" type="radio" value="6"/>6人
			<input name="nb" type="radio" value="7"/>7人
			<input name="nb" type="radio" value="8"/>8人
			<input name="nb" type="radio" value="9"/>9人
			<input name="nb" type="radio" value="10"/>10人
		</div>
		<div class="desk">
			<div class="card">玩家1<p class="namep"><?php echo $_REQUEST["name1"] ?></p>
				<form name = 'awl' action = '' method = 'post'>
		            <input type="text" name="name1" placeholder="标记玩家名字" >
		            <input type = 'submit' name = 'submit' value = '提交' />
		        <!-- </form> -->
			</div>
			<div class="card">玩家2<p class="namep"><?php echo $_REQUEST["name2"] ?></p>
				<!-- <form name = 'awl2' action = '' method = 'post'> -->
		            <input type="text" name="name2" placeholder="标记玩家名字" >
		            <input type = 'submit' name = 'submit' value = '提交' />
		        </form>
			</div>
			<div class="card">玩家3<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家4<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家5<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家6<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家7<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家8<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家9<input type="text" placeholder="标记玩家名字"></div>
			<div class="card">玩家10<input type="text" placeholder="标记玩家名字"></div>
		</div>
	</body>
	<script>
		$(function(){
         $(".number input").click(function(){
         	$(".card").css("display","none")
            var val=$('input:radio[name="nb"]:checked').val();
            if(val==null){
                alert("什么也没选中!");
                return false;
            }
            else{
              for(var i=0;i<val;i++){
				  $('.card').eq(i).css("display","inline-block");
				}
            }     
         });
     });
	</script>
</html>
