                <section id="footer">
                    <div class="container">
                        <ul class="copyright">
                            <li>&copy; 2016 <a href="<?php echo get_option('home'); ?>"><?php bloginfo('name'); ?></a> All Rights Reserved.</li>
                            <li>Theme <a href="https://github.com/Vtrois/Sirius" target="_blank" rel="nofollow">Sirius</a> Made by <a href="https://www.vtrois.com/" target="_blank" rel="nofollow">Vtrois</a></li>
                            <li><a href="http://www.miitbeian.gov.cn/" rel="external nofollow" target="_blank"><?php echo get_option( 'zh_cn_l10n_icp_num' );?></a><?php echo (!sirius_option('site_tongji')) ? '' : '<script ' . sirius_option('site_tongji') . '</script>'; ?></li>
                        </ul>
                    </div>
                </section>
            </div>
    </body>
    <?php wp_footer();?>
</html>