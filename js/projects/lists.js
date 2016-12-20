/**
 * Created by lfs on 16/8/12.
 */
function createChart(e, data) {
    var myChart = echarts.init(document.getElementById(e));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        xAxis: {
            show: false
        },
        yAxis: {
            show: false,
            type: 'category',
        },
        color:['#EB5A3C','#FFC402','#FF7733','#00C185','#7264BC'],
        series: JSON.parse(data)
    };
    myChart.setOption(option);

}

$(document).ready(function () {
    $('.createChart').each(function(){
        var data = $(this).attr('data-val');
        if(data){
            var eleId = $(this).attr('id');
            createChart(eleId, data);
        }

    });


    $('.delete').click(function(){
        $('#myModal').attr('data-key',$(this).attr('data-key'));
    });

    $('#confirmDel').click(function(){
        var project_key = $('#myModal').attr('data-key');
        if(''!=project_key){
            $.ajax({
                url: '/projects/del-project',
                type: 'POST',
                data: {key: project_key},
                dataType: 'json',
                success: function (rep) {
                    if (rep.status) {
                        $('#myModal').modal("hide");
                        $('#project_'+project_key).remove();
                        $('.ebms-success-tip').tip('删除项目成功');
                    }else{
                        if ('' != rep.msg) {
                            $('.ebms-failed-tip').tip(rep.msg);
                        } else {
                            $('.ebms-failed-tip').tip('删除失败，请刷新页面重试');
                        }
                    }
                },
                error: function () {
                    $('.ebms-failed-tip').tip('删除失败，请刷新页面重试');
                }
            });
        }
    });
});
