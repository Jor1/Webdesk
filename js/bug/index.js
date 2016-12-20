/**
 * Created by lfs on 16/8/5.
 *
 */


/**
 * 创建折线
 * @param e 控件ID
 * @param titleArr 数据
 * @param valArr 数据
 * @author baibingyi
 */
function createChart(e, titleArr, valArr) {
    var myChart = echarts.init(document.getElementById(e));
    // 指定图表的配置项和数据
    var option = {
        grid: {
            bottom: 5,
            top: 5,
            left: 0,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        xAxis: {
            show: false,
            type: 'category',
            data: titleArr
        },
        yAxis: {
            show: false,
            type: 'value',

        },
        color: ['#FFF'],

        series: [
            {
                name: '数量',
                type: 'line',
                lineStyle: {
                    normal: {
                        type: 'solid',
                        width: 1
                    }
                },
                data: valArr
            }
        ]
    };
    myChart.setOption(option);
}

$(document).ready(function () {
    var box = $("#project_status .issue-charts-item a");
    box.hover(function () {
        var obj = $(this).find(".chart");
        obj.css("display", "block");
        var e = obj.attr('id');
        var titleArr = obj.attr('data-title').split(',');
        var valArr = obj.attr('data-val').split(',');
        createChart(e, titleArr, valArr);
    }, function () {
        $(this).find(".chart").css("display", "none");
        $(this).find(".chart").html('');
    });

    $('#tab_assign,#tab_report,#tab_track').click(function() {
    	var action = $(this).attr('data-action');
    	var key = testin.key;
    	var container = $(this).attr('href');
    	
    	if ($(container).html().trim().length == 0) {
    		$.post('/bug/' + action, {'key' : key}, function(data) {
        		$(container).html(data);
        	});
    	}
    });
    
    $('#tab_assign').click();
})