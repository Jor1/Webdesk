<div id="centerbg">
  <div class="slant-left"></div>
  <div class="slant-right"></div>
	 <div class="focusinfo">
	   <?php if (akina_option('focus_logo')):?>
		     <div class="header-tou"><a href="<?php bloginfo('url');?>" ><img src="<?php echo akina_option('focus_logo', ''); ?>"></a></div>
		  <?php else :?>
             <div class="header-tou" >
			 <a href="<?php bloginfo('url');?>"><img src="http://7xwpo4.com1.z0.glb.clouddn.com/akinadeaava.jpg"></a>
			 </div>	
          <?php endif ;?>
		  
		 <div class="header-info">
			 <p><?php echo akina_option('admin_des', 'Carpe Diem and Do what I like'); ?></p>
         </div>	

		 <div class="top-social">
		<?php if (akina_option('wechat')){ ?>
				<li class="wechat"><a href=""><img src="<?php bloginfo('template_url'); ?>/images/wechat.png"/></a>
			<div class="wechatInner">
				<img src="<?php echo akina_option('wechat', ''); ?>" alt="微信公众号">
			</div>
		  </li>
			<?php } ?> 
	    <?php if (akina_option('sina')){ ?>
				<li><a href="http://<?php echo akina_option('sina', ''); ?>" target="_blank" class="social-sina" title="sina"><img src="<?php bloginfo('template_url'); ?>/images/sina.png"/></a></li>
			<?php } ?>
			
		<?php if (akina_option('qq')){ ?>
				<li class="qq"><a href=""><img src="<?php bloginfo('template_url'); ?>/images/qq.png"/></a>
			<div class="qqInner">
				<?php echo akina_option('qq', ''); ?>
			</div>
		</li>
			<?php } ?>	
		<?php if (akina_option('qzone')){ ?>
				<li><a href="<?php echo akina_option('qzone', ''); ?>" target="_blank" class="social-qzone" title="qzone"><img src="<?php bloginfo('template_url'); ?>/images/qzone.png"/></a></li>
			<?php } ?>
		<?php if (akina_option('github')){ ?>
				<li><a href="<?php echo akina_option('github', ''); ?>" target="_blank" class="social-github" title="github"><img src="<?php bloginfo('template_url'); ?>/images/github.png"/></a></li>
			<?php } ?>	
		<?php if (akina_option('lofter')){ ?>
				<li><a href="<?php echo akina_option('lofter', ''); ?>" target="_blank" class="social-lofter" title="lofter"><img src="<?php bloginfo('template_url'); ?>/images/lofter.png"/></a></li>
			<?php } ?>	
		<?php if (akina_option('bili')){ ?>
				<li><a href="<?php echo akina_option('bili', ''); ?>" target="_blank" class="social-bili" title="bili"><img src="<?php bloginfo('template_url'); ?>/images/bilibili.png"/></a></li>
			<?php } ?>
		<?php if (akina_option('youku')){ ?>
				<li><a href="<?php echo akina_option('youku', ''); ?>" target="_blank" class="social-youku" title="youku"><img src="<?php bloginfo('template_url'); ?>/images/youku.png"/></a></li>
			<?php } ?>	
	  </div>		 
	  </div>
	       
</div>






		
	
	
	




