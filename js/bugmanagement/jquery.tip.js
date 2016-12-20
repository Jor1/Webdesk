/**
 * Created by yangming on 16/8/26.
 */
+(function(w,$){
    var cache = [],list = [],Default = {
        top:60,
        topSpacing:10,
        duration:2000,
        maxShowNum:2
    };
    function Tip(ele,options,callback){
        this.ele = $(ele);
        this.txt = this.ele.find('.tip-content');
        this.state = true;
        this.change = callback;
        this.stateChange(this.state);
        if(list.length<Default.maxShowNum){
            list.push(this);
            this.show(typeof(options)==='string'?options:null);
        }else{
            cache.push(this);
        }
    }

    Tip.prototype.stateChange = function(state){
        this.state = state;
        typeof(this.change)!=='function'||this.change(state);
    };

    Tip.prototype.show = function(text){
        if(typeof(text)==='string'){
            this.txt.text(text);
        }
        var that = this,
            _w = this.ele.outerWidth(),index = list.length-1,
            top = 0,temp_top = 0;
        temp_top = $(w).scrollTop()>Default.top?Default.topSpacing:Default.top;
        top = index?(parseFloat(list[index-1].ele.css('top'))+list[index-1].ele.outerHeight()+Default.topSpacing):temp_top;
        this.ele.css({
            marginLeft:-_w/2,
            top:top
        }).fadeIn(function(){
            index||that.timeOut();
        });
        return this;
    };
    Tip.prototype.timeOut = function(){
        var that = this,old = list[0],
            top = old.ele.outerHeight()+Default.topSpacing;
        this.timer = setTimeout(function(){
            old.ele.fadeOut(function(){
                list.shift();
                !list.length||$.each(list,function(index,value){
                    value.ele.animate({top:'-='+top+'px'},function(){
                        if(index===list.length-1&&cache.length){
                            var last =cache.shift();
                            list.push(last);
                            last.show();
                        }
                        if(!index){
                            value.timeOut();
                        }
                    });
                });
                that.stateChange(false);
            });
        },Default.duration);
    };
    $.fn.tip = function (options,callback) {
        return $(this).each(function(){
            var data = $(this).data('tip');
            if(!data){
                $(this).data('tip',data = new Tip(this,options,callback));
            }else{
                if(!data.state&&$(this).is(':hidden')){
                    clearTimeout(data.timer);
                    (list.length<2?list:cache).push(data);
                    data.show(options,callback);
                }
            }
        });
    };
    $.fn.tip.constructor = Tip.constructor;
    $.TipDefault = function(options){
        Default = $.extend({},Default,typeof(options)==='object'?options:{});
    };
})(this,jQuery);