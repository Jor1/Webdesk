/**
 * Created by lfs on 16/8/9.
 */

    $(document).ready(function () {
        var extension = 'jpeg、jpg、png';
        var $file_thumb = $('.file-thumb'),
            $btn_delete = $('.file-tools');
        var limit = 2048000;
        var fileId = '';
        //上传
        var uploader = WebUploader.create({
            // 文件接收服务端。
            server: service,
            dnd: '.file-upload',   //有bug
            paste: 'document.body',           //有bug
            pick: {
                id: '.file-upload',
                multiple: false
            },
            swf: '/lib/webuploader/Uploader.swf',
            //接收的类型
            accept: {
                title: 'Images',
                // extensions: 'jpg,jpeg,png',
                mimeTypes: 'image/!*'
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
            fileVal: 'uploadFile',
            threads: 1,
            auto: true,
            duplicate: true
        });

        uploader.on('uploadBeforeSend', function (block, data, headers) {
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
        });

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            fileId = file.id;

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
                    return;
                }
                $file_thumb.html('<img alt="" src="' + src + '" />').show();
            });
        });

        /*上传过程中*/
        uploader.on('uploadProgress', function () {
            $file_thumb.html('<div class="loding-mask"><img class="lodings" src="/images/test-loading.gif"/></div>');
        });

        /*成功*/
        uploader.on('uploadSuccess', function (file, obj) {

            if (0 == obj.code) {
                var src = obj.data.fileinfo.fileUrl;
                $file_thumb.html('<img width="50px" alt="" src="' + src + '" />');
                $btn_delete.show();
                $('.credentials_img').val(src).blur();
            }
        });

        /*失败*/
        uploader.on('uploadError', function (file, obj) {

            $btn_delete.hide();
            $file_thumb.hide().children().remove();
            $('.credentials_img').val('').blur();
            //提示
        });

        /*删除*/
        $btn_delete.click(function () {
            $('.credentials_img').val('').blur();
            uploader.removeFile(fileId);
            $btn_delete.hide();
            $file_thumb.hide().children().remove();
        });


    });
