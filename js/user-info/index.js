/**
 * Created by lfs on 16/8/4.
 */
/**
 * 未完待续
 **/
$(document).ready(function () {

    var extension = 'jpeg、jpg、png';
    var $file_thumb = $('#portrait-select-div');
    var $portraits = $('#select-portrait-icon');
    var limit = 1024*1024*2;
    var old_img = '';
    var fileId = '';

    var uploader = WebUploader.create({
        auto: true,
        chunkRetry:3,
        // swf文件路径
        swf: '/lib/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: service,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id : '.file-upload',
            multiple: false
        },

        thumb: {
            width: 145,
            height: 250,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 70,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: true,
            // 是否允许裁剪。
            crop: false,
            // 为空的话则保留原有图片格式。
            // 否则强制转换成指定的类型。
            type: 'image/jpeg'
        },

        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        fileVal: 'uploadFile',
        threads: 1
    });

    uploader.on('uploadBeforeSend', function (block, data, headers) {

        fileId = data.id;

        var opt_data = {
            uid: '60',
            op: "Ctfile.upload",
            tag: "testinPortal",
            suffix: ''
        };
        delete data.id;
        delete data.name;
        delete data.type;
        delete data.lastModifiedDate;
        delete data.size;
        delete data.chunks;
        delete data.chunk;

        $.extend(data, {
            'UPLOAD-JSON': JSON.stringify(opt_data)
        });
        //存储老数据
        old_img = $file_thumb.html();

    });

    uploader.on( 'fileQueued', function( file ) {
        //console.log(file);exit;
        if (extension.indexOf(file.ext.toLocaleLowerCase()) == -1) {
            $('.ebms-warning-tip').tip('请上传jpeg、jpg、png格式的文件');
            uploader.stop(true);
            uploader.removeFile(file);
            return false;
        }

        if (file.size > limit) {
            $('.ebms-warning-tip').tip('文件超出大小限制');

            uploader.stop(true);
            uploader.removeFile(file);
            return false;
        }


        uploader.makeThumb(file, function (error, src) {
            if (error) {
                return false;
            }
            $file_thumb.html('<img alt="" src="' + src + '" />').show();

        });
    });

    uploader.on( 'uploadProgress', function( file, percentage ) {
        $file_thumb.html('<div class="loding-mask"><img class="lodings" src="/images/test-loading.gif"/></div>');
    });

    /**
     * 成功上传
     */
    uploader.on( 'uploadSuccess', function( file , obj) {

        if(0 == obj.code){
            var src = obj.data.fileinfo.fileUrl;
            $file_thumb.html('<span class="add-portrait-title">头像</span><img width="50px" alt="" src="' + src + '" />'+'上传小于2MB的PNG、JPG文件 或 选择一个testin头像');
            $('#portrait').val(src);
            $('#select-portrait-icon').toggle();
            $('.ebms-success-tip').tip('头像设置成功，点击保存生效。');
        }
    });

    /**
     * 上传出错
     */
    uploader.on( 'uploadError', function( file ) {
        $file_thumb.html(old_img);
        $portraits.toggle();

        //提示错误
        $('.ebms-failed-tip').tip('头像上传失败，请稍后重试');
    });

    //选择
    $('#portrait-select-div').click(function(event){
        event.stopPropagation();
        $('select.testin-select-open').testinSelect('hide');
        $portraits.toggle('show');
    })

    //保存
    $('.save-btn').click(function(){
        $('#user-info-form').submit();
    });

    //选择默认图标
    $('.default-staff-portrait-icon').click(function(){
        var default_src = $(this).attr('src');
        $file_thumb.html('<span class="add-portrait-title">头像</span><img alt="" src="' + default_src + '" />'+'上传小于2MB的PNG、JPG文件 或 选择一个testin头像');
        $('#portrait').val(default_src);
        $('#select-portrait-icon').toggle();
        $('.ebms-success-tip').tip('头像设置成功，点击保存生效。');
    });
    $(document).on('click',function(){
        $portraits.hide();
    });
});
