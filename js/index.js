function startTime()
{
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
// add a zero in front of numbers<10
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('dayTime').innerHTML=h+":"+m+":"+s;
    t=setTimeout('startTime()',500)
}

function checkTime(i)
{
    if (i<10)
    {i="0" + i}
    return i
}

$(function(){
    $(document).ready(function(){
        $("#loading").hover(function(){
            $(this).css({cursor:"wait"})
        });
        $("#loading").delay(3000).fadeOut("slow");
    },3000,function(){
        $("#loading").hide();

    });
    $("*").mousedown(function(e){
//                alert(e.which) // 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
        return false;//阻止链接跳转
    });
    $("#desk ul,.bottom").mousedown(function(e){
        if(1 == e.which){
            $("#bottom-set,#bg-set").hide()
        }
    });
    $(".bottom").mousedown(function(e){
        if(3 == e.which){
            var div = $("#bottom-set");
            if(div.is(":hidden")){
                div.show();
                div.css("left",document.body.scrollLeft+event.clientX+1);
                div.css("top",document.body.scrollLeft+event.clientY-200);
                div.css("background-color","#EFF7FE");
            }else{
                div.hide();
            }}
    });
    $("#desk ul").mousedown(function(e){
        if(3 == e.which){
            var div = $("#bg-set");
            if(div.is(":hidden")){
                div.show();
                div.css("left",document.body.scrollLeft+event.clientX+1);
                div.css("top",document.body.scrollLeft+event.clientY+1);
                div.css("background-color","#EFF7FE");
            }else{
                div.hide();
            }}
    });
    $("#bottom-set li").click(function(){
        var bbg=$(this).attr("style");
        $(".bottom").attr("style",bbg)
    });
    $("#bg-set img").click(function(){
        var dbg=$(this).attr("src");
        $("body").attr("style","background:url("+dbg+")no-repeat scroll center top transparent;");
    });
    $("#desk ul li").hover(function(){
        $(this).find("em").css("display","block");
    },function(){
        $(this).find("em").hide()
    });
    $("#desk ul li:not(.no-window)").click(function(){
        var n=$(this).attr("title");
        var p=$(this).find("img").attr("src");
        var l=$(this).attr("link_to");
        $(".bottom-ul h2").text(n);
        $(".title-frame h3").text(n);
        $(".bottom-ul li img").attr("src",p);
        $(".bottom-ul").show();
        $(".window").show().children("div").show().width("0px");
        $(".title-frame").animate({width:"1158px"},300); $(".window-frame").animate({width:"1200px"},300);
        $(".window").find("iframe").attr("src",l);
    });

    $(".close-window").click(function(){
        $(".window").find("iframe").attr("src","");
        $(".window").hide();
        $(".bottom-ul").hide();
        $(".window").find(".window-frame").css({width:"1200px"});
        $(".window").find(".title-frame").css({width:"1158px"})
    });
    $(".max-small").click(function(){
        $(".window").find(".window-frame").css({width:"1200px"});
        $(".window").find(".title-frame").css({width:"1158px"})
    });
    $(".max-big").click(function(){
        $(".window").find(".window-frame").css({width:"100%"});
        $(".window").find(".title-frame").css({width:"98%"})
    });

    $(".leave").click(function(){
        $("#window-safe").show()
    });
    $('#window-safe').click(function(){
        $(this).hide();
        $(".bottom-ul").hide()
    });
    $(".wy-music").click(function(){
        $(".my-music").show()
    });
    $(".close-music").click(function(){
        $(".my-music").hide()
    });
});
