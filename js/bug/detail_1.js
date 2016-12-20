$(document).ready(function() {
    
	bug_edit_obj.init();
    discussion.init();

	$('.btn-delete').click(function() {
		if (confirm('是否删除')) {
			bug_edit_obj.editReset();
			
			bug_edit_obj._bug_id = $(this).attr('data-id');
			bug_edit_obj._is_deleted = 1;
			
			bug_edit_obj.edit(function(data) {
				if (data.code == 0) {
					window.location.href = "/buglist?key=" + testin.key;
				} else {
					$('.ebms-failed-tip').tip('删除失败');
				}
			});
		}
	});
	
	$('input[name=followers]').change(function() {
		var user_id = $(this).val();
		var bug_id = $(this).attr('data-id');
		var checked = $(this).is(':checked');
		
		$.post('/bug/followers', {'key' : testin.key, 'user_id' : user_id, 'bug_id' : bug_id, 'checked' : new Number(checked)}, function(data) {
			console.dir(data);
		});
	});

    init_upload_attr();
});


var discussion = {
    init : function () {

        discussion.getDiscussion(page,bug_id)
        $('#submit_discussion').on('click',function(){
            var data = $('#addDiscussionForm').serializeArray();

            if ('' == $.trim(data[0].value) || 'undefined' ==  $.trim(data[0].value)) {
                //添加
                $('.ebms-failed-tip').tip('请输入讨论内容');
                return false;
            }

            discussion.addDiscussion(data);
        });
    },
    
    bindEvent:function(){
        $('.btn-del').bind('click', function(){

            if (confirm('是否删除')) {
                discussion.del($(this));
            }
        });

        $('.page-btn').bind('click',function(){
            var current_page = $(this).attr('data-page');
            discussion.getDiscussion(current_page,bug_id);
        });
    },

    del : function (obj) {
        var $discussion_id = obj.attr('data-id');

        $.ajax({
            url :  '/discussion/del-bug',
            type : 'POST',
            data : {'discussion_id':$discussion_id, 'bug_id':bug_id},
            dataType : 'json',
            success : function(data){
                if (0 == data.code) {
                    discussion.getDiscussion(1,bug_id);

                    $('.ebms-success-tip').tip('撤回成功');
                } else {
                    $('.ebms-failed-tip').tip('撤回失败');
                }
            }

        });
    },

    addDiscussion : function(data){
        $.ajax({
            url :  '/discussion/add-discussion',
            type : 'POST',
            data : {'discussion':data},
            dataType : 'json',
            success : function(rep){
                if (0 == rep.code) {

                    discussion.getDiscussion(1,bug_id);
                    //清除数据
                    $('#discussionContent').val('');
                    $('#bugAttachmentSrc').val('');
                    $('.enclosure-list').empty();

                    $('.ebms-success-tip').tip('保存成功');
                } else {
                    $('.ebms-failed-tip').tip('保存失败');
                }
            }

        });
    },

    getDiscussion : function (page, bug_id) {
        $.ajax({
            url :  '/discussion/get-discussion',
            type : 'POST',
            data : {'page':page,'bug_id':bug_id},
            dataType : 'html',
            success : function(rep){

                $('.message-list').html(rep);
                discussion.bindEvent();
            },
            error : function () {
                $('.ebms-failed-tip').tip('获取讨论失败,请重试');
            }

        });
    }

};



function init_upload_attr() {

    //var extension = 'jpeg、jpg、png';
    var file_thumb = $('.enclosure-list'),
        btn_delete = $('.file-tools');
    var limit = 10240000;
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
        if (len >= 2) {
            $('#div_add').hide();
        }

        if (len > 3) {
            $('.ebms-warning-tip').tip('超出文件个数限制');
            
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
        //'<p class="enclosure-operation"><i class="iconfont icon-close btn-close"></i></p>'
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

            $('.ebms-success-tip').tip('上传成功');

        } else {
            $('.ebms-success-tip').tip('上传失败');

        }

    });

    /*失败*/
    uploader.on('uploadError', function (file, obj) {
        //提示
        $('.ebms-failed-tip').tip('上传失败,稍后重试');

        btn_delete.hide();
        file_thumb.hide().children().remove();
        $('.icon_path').val('').blur();

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
    if (len < 3) {
        if(len == 0){
            $('.annex_e').hide();
        }
        $('#div_add').show();
    }
}