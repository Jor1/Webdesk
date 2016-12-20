var T_i;
var T_Countdown = {
    startTime:60,
    endTime:0,
    nowTime:0,
    countType:'D',
    t:1000,
    e:'#T_countDown',
    z:'-TT-',
    c:'-TT-',
    sc:'获取验证码',
    i:'',
    action:'click',
    beginCallback:'',
    endCallback:'',
    setOpt:function(obj){

        if('D' == T_Countdown.countType){
            if(T_Countdown.startTime <= T_Countdown.endTime){
                //alert('倒计时开始时间不能小于结束时间');
                return ;
            }
        }else{
            if(T_Countdown.startTime >= T_Countdown.endTime){
               // alert('计时结束时间不能小于开始时间');
                return ;
            }
        }

        for(var v in obj){
            T_Countdown[v] = obj[v];
        }

        switch (T_Countdown.action){
            case 'auto':
                T_Countdown.go();
                break;
            case 'click':
            default :
                $(T_Countdown.e).click(T_Countdown.go);

        }
    },
    go:function(){

        if('' != T_Countdown.beginCallback){
            var check = eval(T_Countdown.beginCallback);
            if (false === check) {
                return false;
            }
        }
        $(T_Countdown.e).addClass('disabled', 'disabled');
        T_Countdown.nowTime = T_Countdown.startTime;
        $(T_Countdown.e).unbind();
        T_Countdown.i = window.setInterval(function(){
            if('D' == T_Countdown.countType){
                T_Countdown.nowTime =  --T_Countdown.nowTime;
            }else{
                T_Countdown.nowTime =  ++T_Countdown.nowTime;
            }

            if(T_Countdown.nowTime == T_Countdown.endTime){
                T_Countdown.stop(T_Countdown.i);
                return;
            }
            var str = T_Countdown.c.replace(T_Countdown.z, T_Countdown.nowTime);
            $(T_Countdown.e).html(str);

        },T_Countdown.t);

        return T_Countdown.i;
    },
    stop:function(obj){

        $(T_Countdown.e).html(T_Countdown.sc).click(T_Countdown.go);
        window.clearInterval(obj);
        $(T_Countdown.e).removeClass('disabled');
        if('' != T_Countdown.endCallback){
            eval(T_Countdown.endCallback);
        }
    }
};