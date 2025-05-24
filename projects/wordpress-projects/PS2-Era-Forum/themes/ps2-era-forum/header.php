<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div id="wrapper">
    <div id="header">
        <div id="site-title">
            <h1><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
            <p class="site-description"><?php bloginfo('description'); ?></p>
        </div>
        
        <div id="main-nav">
            <ul class="nav-menu">
                <li><a href="<?php echo home_url(); ?>">Home</a></li>
                <li><a href="<?php echo home_url('/forums/'); ?>">Forums</a></li>
                <li><a href="<?php echo home_url('/forums/game-development/'); ?>">Game Dev</a></li>
                <li><a href="<?php echo home_url('/forums/project-noxii/'); ?>">Project Noxii</a></li>
                <li><a href="<?php echo home_url('/forums/project-on-command/'); ?>">On Command</a></li>
                <li><a href="<?php echo home_url('/forums/project-dodec/'); ?>">Dodec</a></li>
                <li><a href="<?php echo home_url('/forums/technical-development/'); ?>">Tech Talk</a></li>
            </ul>
        </div>
    </div>
    
    <div id="content">
