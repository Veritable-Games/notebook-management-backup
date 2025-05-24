const express = require('express');
const path = require('path');

function setupRoutes(app) {
    // Serve the unified wiki interface
    app.get('/wiki', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/wiki/index.html'));
    });
    
    // Serve 3D visualization
    app.get('/3d', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/3d/index.html'));
    });
    
    // Redirect old endpoints to the new unified interface
    app.get('/simple', (req, res) => {
        res.redirect('/wiki');
    });
    
    app.get('/enhanced', (req, res) => {
        res.redirect('/wiki');
    });
    
    // Redirect the root to the unified interface
    app.get('/', (req, res) => {
        res.redirect('/wiki');
    });
    
    // Make sure static files for the wiki are served
    app.use('/wiki', express.static(path.join(__dirname, '../frontend/wiki')));
}

module.exports = {
    setupRoutes
};
