/**
 * Created by lfs on 16/8/3.
 */
var bug = {
    init: function () {
        $('.btn-sure').on('click', function () {
            bug.getFollower();
            $('#bug-form').submit();
        });
    },

    getFollower: function () {
        var flllower_value = '';
        $('.bug-follow').find('.input-checkbox:checked').each(function () {
            flllower_value = flllower_value + ',' + $(this).val();
        });
        $('.bug-follow-input').val(flllower_value);
    }

};

var uploader = null;
$(document).ready(function () {
    bug.init();

    init_upload();
    init_upload_attr();

    var $body = $('body');

    //下拉
    $('.dropdown-select').each(function () {
        var $dropdown_text = $(this).find('.dropdown-text');

        $(this).find('.dropdown-menu').each(function () {
            $(this).on('click', '>li', function () {
                var common_value = $(this).attr('value');
                var common_class = $(this).attr('class');

                var parent_id = $(this).attr('data-parent');

                //模块子模块修改
                if('1' == parent_id){
                    var son = modules[common_value]['son'];
                    $('#module_id_son').empty();
                    $('#module_id_text').text('-');
                    $('<li>', {
                        'value' : common_value,
                        'text' : '-',
                        'class' : 'modules-id-select'
                    }).appendTo('#module_id_son');

                    if(son){
                        for (var i in son) {
                            $('<li>', {
                                'value' : i,
                                'text' : son[i].module_name,
                                'class' : 'modules-id-select'
                            }).appendTo('#module_id_son');
                        }
                    }
                }

                //赋值
                $('.' + common_class + '-input').val(common_value);

                $dropdown_text.html($(this).html());
                $(this).siblings('.selected').removeClass('selected').end().addClass('selected');
            });
        });
    });

    //多选
    $('.dropdown-multi').each(function () {
        var isload = true,
            that = $(this),
            $all_cbx = $(this).find('.dropdown-multi-btn .checkbox-inline .input-checkbox'),
            $dropdown_menu = $(this).find('.dropdown-menu'),
            $other_cbxs = $dropdown_menu.find('.checkbox-inline .input-checkbox');
        $all_cbx.on('change', function () {
            $other_cbxs.prop('checked', $(this).prop('checked'));
        }).parent().on('click', function (e) {
            e.stopPropagation();
        });
        $other_cbxs.on('change', function () {
            $all_cbx.prop('checked', $other_cbxs.filter(':checked').length);
        });
        $dropdown_menu.on('click', '>li', function (e) {
            e.stopPropagation();
        });
        $(this).data('dropdown_menu', $dropdown_menu).on('shown.bs.dropdown', function (e) {
            if (isload) {
                $dropdown_menu.addClass('dropdown-multi-menu').appendTo($body);
                isload = false;
            }
            $dropdown_menu.css(that.offset()).show();
        }).on('hidden.bs.dropdown', function () {
            $(this).data('dropdown_menu').hide();
        });
    });

    //版本出现更多
    var $version_list = $('.version-list');
    $('.btn-show-more').click(function () {
        $version_list.addClass('all');
        $(this).hide();
    });

    $('.swiper').each(function () {
        var swiper = $(this).swiper({
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 8000,
            autoplayDisableOnInteraction: false
        });
        $(this).find('.swiper-button-prev').on('click', function (e) {
            e.preventDefault();
            swiper.swipePrev();
        });
        $(this).find('.swiper-button-next').on('click', function (e) {
            e.preventDefault();
            swiper.swipeNext();
        })
    });
    

});


function init_upload() {

    var extension = 'jpeg、jpg、png';
    var file_thumb = $('.uploader-thumbs'),
        btn_delete = $('.file-tools');
    var limit = 2048000;
    var fileId = '';
    //上传
    uploader = WebUploader.create({
        // 文件接收服务端。
        server: upload_Url,
        pick: {
            id: '#state-add',
            multiple: false
        },
        dnd: '#problem-uploader',
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
        //fileNumLimit: 5,
        threads: 1,
        //fileSizeLimit: 2048000,
        //fileSingleSizeLimit: 2048000,
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

        var len = $('.uploader-thumbs li').length;
        if (len >= 5) {
            $('#state-add').hide();
        }
        if (len > 5) {
            uploader.removeFile(file);
            return;
        }

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
            file_thumb.prepend('<li id="' + fileId + '"><img alt="" src="' + src + '" /></li>').show();
        });
    });

    /*上传过程中*/
    uploader.on('uploadProgress', function (file) {
        $('#' + file.id).html('<img class="lodings" src="/images/test-loading.gif"/>');
    });

    /*成功*/
    uploader.on('uploadSuccess', function (file, obj) {

        if (0 == obj.code) {
            var src = obj.data.fileinfo.fileUrl;
            $('#' + file.id).html('<img alt="" src="' + src + '" />');
            // 追加到隐藏域
            $('.bug_img_src').val($('.bug_img_src').val() + ',' + src).blur();
            $('#' + file.id).append('<div class="bt-bar"><a href="javascript:deleteUpload(\'' + (file.id) + '\');"><i class="iconfont">&#xe65b;</i></a></div>');
        }
    });

    /*失败*/
    uploader.on('uploadError', function (file, obj) {
        $('.ebms-warning-tip').tip('上传有误,请重试!');
        btn_delete.hide();
        file_thumb.hide().children().remove();
        $('.icon_path').val('').blur();
        //提示
    });

    /*删除*/
    btn_delete.click(function () {
        $('.icon_path').val('').blur();
        uploader.removeFile(fileId);
        var img_src = $('.bug_img_src').val().replace(',' + src, '');
        $('.bug_img_src').val(img_src);
        btn_delete.hide();
        file_thumb.hide().children().remove();
    });
}

function deleteUpload(fileId) {
    var obj = $('#' + fileId);
    var src = obj.find('img').attr('src');
    obj.remove();
    var bug_img = $('.bug_img_src').val();
    var img_src = bug_img.replace(',' + src, '');
    $('.bug_img_src').val(img_src);

    var len = $('.uploader-thumbs li').length;
    if (len < 5) {
        $('#state-add').show();
    }
}


function init_upload_attr() {

    var file_thumb = $('.enclosure-list'),
        btn_delete = $('.file-tools');
    var limit = 2048000000000000;
    var fileId = '';
    //上传
    uploader = WebUploader.create({
        // 文件接收服务端。
        server: upload_Url,
        pick: {
            id: '#pick_upload',
            multiple: false
        },
        swf: '/lib/webuploader/Uploader.swf',
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

        var len = $('.enclosure-list li').length;
        if (len >= 4) {
            $('#pick_upload').hide();
        }
        if (len > 5) {
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

        $('.annex_e').show();
        var li_html = '<li class="enclosure-item" id="att_' + fileId + '">';
        li_html += '<i class="iconfont icon-enclosure"></i>';
        li_html += '<span class="enclosure-info"><span class="enclosure-name">' + file.name + '</span>（' + (file.size / 1000000).toFixed(2) + 'MB）</span>';
        li_html += '<input type="text" value="" class="input-txt" placeholder="请输入附件名称" onblur="delAttachment(\'.enclosure-list input\',\'false\')"/>';
        li_html += '<p class="enclosure-progress"><span id="bar_' + fileId + '" style="width: 0%"></span></p></li>'
        file_thumb.prepend(li_html).show();
    });

    /*上传过程中*/
    uploader.on('uploadProgress', function (file, percentage) {
        var progress_num = (percentage * 100).toFixed(2) + '%';
        $('#bar_' + (file.id)).css('width', progress_num);
        //$('#progress_num').html(progress_num);
    });

    /*成功*/
    uploader.on('uploadSuccess', function (file, obj) {

        if (0 == obj.code) {
            var src = obj.data.fileinfo.fileUrl;
            var obj = $('#att_' + file.id);
            obj.find('.enclosure-progress').remove();
            
            obj.find('input[type="text"]').val((file.name).replace('-',' '));

            var src_html = '<input type="hidden" value="'+src+'" /><p class="enclosure-operation"><i class="iconfont icon-close btn-close" onclick="delAttachment(\''+(file.id)+'\')"></i></p>';

            obj.append(src_html);

            getAttachmentVal('.enclosure-list input',false);

        }
    });

    /*失败*/
    uploader.on('uploadError', function (file, obj) {
        $('.ebms-failed-tip').tip('error');
        btn_delete.hide();
        file_thumb.hide().children().remove();
        $('.icon_path').val('').blur();
        //提示
    });
}

function getAttachmentVal(id,ret){
    var str_val = '';
    $(id).each(function(){
        var index_no = $(this).index();
        if(index_no%2){
            str_val += '-';
        }else{
            str_val += ',';
        }
        str_val += $(this).val();
    });
    if(ret){
        return str_val;
    }else{
        // 追加到隐藏域
        $('.bug_attachment_src').val(str_val).blur();
    }
}

function delAttachment(fileId) {

    var all_str = getAttachmentVal('.enclosure-list input',true);
    var del_str = getAttachmentVal('#att_'+fileId+' input',true);
    var obj = $('#att_' + fileId);
    obj.remove();
    var attachement_src = all_str.replace(del_str, '');
    $('.bug_attachment_src').val(attachement_src).blur();

    var len = $('.enclosure-list li').length;
    if (len < 5) {
        if(len == 0){
            $('.annex_e').hide();
        }
        $('#pick_upload').show();
    }
}