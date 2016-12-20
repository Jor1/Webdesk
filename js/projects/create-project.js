/**
 * Created by lfs on 16/8/11.
 */
$(document).ready(function(){
    //				切换
    $(".select-type-box").on("click",function(){
        $('.select-type-box').removeClass('active');
        $(this).addClass("active");
        
        var  $project_type = $(this).attr('data-id');
        $('#projectmodel-project_type').val($project_type);
    })
});