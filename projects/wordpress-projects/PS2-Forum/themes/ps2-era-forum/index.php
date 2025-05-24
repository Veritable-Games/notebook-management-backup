<?php get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

    <?php
    if (have_posts()) :
        while (have_posts()) : the_post();
            // Include the template for the content
            get_template_part('content', get_post_format());
        endwhile;

        // Previous/next page navigation if needed
        the_posts_pagination(array(
            'prev_text' => __('Previous', 'ps2-era-forum'),
            'next_text' => __('Next', 'ps2-era-forum'),
        ));

    else :
        // If no content, include the "no posts found" template
        echo '<p>No content found</p>';
    endif;
    ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
