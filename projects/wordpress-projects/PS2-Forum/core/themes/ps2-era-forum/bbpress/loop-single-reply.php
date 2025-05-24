<div class="bbp-reply-header">
    <div class="bbp-meta">
        <span class="bbp-reply-post-date"><?php bbp_reply_post_date(); ?></span>
        <?php if (bbp_is_single_user_replies()) : ?>
            <span class="bbp-header">
                <?php _e('in reply to: ', 'bbpress'); ?>
                <a class="bbp-topic-permalink" href="<?php bbp_topic_permalink(bbp_get_reply_topic_id()); ?>"><?php bbp_topic_title(bbp_get_reply_topic_id()); ?></a>
            </span>
        <?php endif; ?>
        <a href="<?php bbp_reply_url(); ?>" class="bbp-reply-permalink">#<?php bbp_reply_id(); ?></a>
        <?php do_action('bbp_theme_before_reply_admin_links'); ?>
        <?php bbp_reply_admin_links(); ?>
        <?php do_action('bbp_theme_after_reply_admin_links'); ?>
    </div>
</div>

<div id="post-<?php bbp_reply_id(); ?>" class="bbp-reply-body forum-post" data-post-id="<?php bbp_reply_id(); ?>">
    <div class="user-info">
        <div class="user-avatar">
            <?php bbp_reply_author_avatar(bbp_get_reply_id(), 60); ?>
        </div>
        <div class="user-name"><?php bbp_reply_author_link(); ?></div>
        <div class="user-rank">Member</div>
        <div class="user-posts">Posts: <?php echo bbp_get_user_reply_count_raw(bbp_get_reply_author_id()); ?></div>
    </div>
    
    <div class="post-content">
        <?php do_action('bbp_theme_before_reply_content'); ?>
        <?php bbp_reply_content(); ?>
        <?php do_action('bbp_theme_after_reply_content'); ?>
        
        <div class="post-signature">
            <?php 
            // Get user signature from user meta
            $signature = get_user_meta(bbp_get_reply_author_id(), 'signature', true);
            echo $signature ? $signature : ''; 
            ?>
        </div>
    </div>
</div>
