<?php get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <div class="forum-container">
            <h1 class="retro-heading">Welcome to Veritable Games Forums</h1>
            
            <div class="forums-list">
                <h2>Forums</h2>
                <?php echo do_shortcode('[bbp-forum-index]'); ?>
            </div>
            
            <div class="recent-activity">
                <h2>Recent Activity</h2>
                <?php echo do_shortcode('[bbp-topic-index]'); ?>
            </div>
        </div>
    </main>
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
