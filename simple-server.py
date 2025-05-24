#!/usr/bin/env python3
import os
import http.server
import socketserver
from urllib.parse import unquote
import json
import datetime

PORT = 3002
NOTEBOOKS_DIR = "/home/user/Notebooks"
TAGS_FILE = "/home/user/Repository/data/tags.json"

# Ensure data directory exists
os.makedirs(os.path.dirname(TAGS_FILE), exist_ok=True)

def load_tags():
    if os.path.exists(TAGS_FILE):
        with open(TAGS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_tags(tags):
    with open(TAGS_FILE, 'w') as f:
        json.dump(tags, f, indent=2)

class NotebookHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.serve_index()
        elif self.path == '/api/directories':
            self.serve_directories()
        elif self.path.startswith('/api/files/'):
            self.serve_files()
        elif self.path.startswith('/api/content/'):
            self.serve_content()
        elif self.path == '/api/tags':
            self.serve_tags()
        elif self.path == '/api/all-files':
            self.serve_all_files()
        elif self.path == '/api/auto-tag':
            self.auto_tag_files()
        else:
            super().do_GET()
    
    def do_POST(self):
        if self.path.startswith('/api/save/'):
            self.save_content()
        elif self.path.startswith('/api/tag/'):
            self.save_tag()
        elif self.path == '/api/auto-tag':
            self.auto_tag_files()
        else:
            self.send_response(404)
            self.end_headers()
    
    def serve_tags(self):
        tags = load_tags()
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(tags).encode())
    
    def save_content(self):
        parts = self.path.split('/')
        directory = unquote(parts[-2])
        filename = unquote(parts[-1])
        file_path = os.path.join(NOTEBOOKS_DIR, directory, filename)
        
        content_length = int(self.headers['Content-Length'])
        content = self.rfile.read(content_length).decode('utf-8')
        
        try:
            # Create backup
            if os.path.exists(file_path):
                backup_path = file_path + '.backup.' + datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
                import shutil
                shutil.copy2(file_path, backup_path)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.send_response(200)
            self.end_headers()
        except Exception as e:
            self.send_response(500)
            self.end_headers()
    
    def save_tag(self):
        file_path = unquote(self.path.split('/')[-1])
        
        content_length = int(self.headers['Content-Length'])
        data = json.loads(self.rfile.read(content_length).decode('utf-8'))
        
        tags = load_tags()
        
        if file_path not in tags:
            tags[file_path] = []
        
        if data['action'] == 'add':
            if data['tag'] not in tags[file_path]:
                tags[file_path].append(data['tag'])
        elif data['action'] == 'remove':
            if data['tag'] in tags[file_path]:
                tags[file_path].remove(data['tag'])
        
        save_tags(tags)
        
        self.send_response(200)
        self.end_headers()
    
    def serve_all_files(self):
        all_files = []
        for directory in os.listdir(NOTEBOOKS_DIR):
            dir_path = os.path.join(NOTEBOOKS_DIR, directory)
            if os.path.isdir(dir_path):
                for filename in os.listdir(dir_path):
                    if os.path.isfile(os.path.join(dir_path, filename)):
                        all_files.append({
                            'name': filename,
                            'directory': directory,
                            'path': directory + '/' + filename
                        })
        
        # Sort files alphabetically
        all_files.sort(key=lambda x: x['name'].lower())
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(all_files).encode())
    
    def auto_tag_files(self):
        tags = load_tags()
        tagged_count = 0
        
        # Auto-tag based on file extensions and content patterns
        for directory in os.listdir(NOTEBOOKS_DIR):
            dir_path = os.path.join(NOTEBOOKS_DIR, directory)
            if os.path.isdir(dir_path):
                for filename in os.listdir(dir_path):
                    file_path = os.path.join(dir_path, filename)
                    if os.path.isfile(file_path):
                        relative_path = directory + '/' + filename
                        
                        if relative_path not in tags:
                            tags[relative_path] = []
                        
                        new_tags = []
                        
                        # Tag by file extension
                        if filename.endswith('.zim'):
                            new_tags.append('zim-notebook')
                        elif filename.endswith('.txt'):
                            new_tags.append('text-file')
                        elif filename.endswith('.md'):
                            new_tags.append('markdown')
                        
                        # Tag by directory content
                        if 'wiki' in directory.lower():
                            new_tags.append('wiki')
                        if 'game' in directory.lower():
                            new_tags.append('game-design')
                        if 'reference' in directory.lower():
                            new_tags.append('reference')
                        if 'character' in directory.lower() or 'character' in filename.lower():
                            new_tags.append('character')
                        if 'dodec' in directory.lower() or 'dodec' in filename.lower():
                            new_tags.append('dodec-project')
                        if 'autumn' in directory.lower() or 'autumn' in filename.lower():
                            new_tags.append('autumn-project')
                        if 'noxii' in directory.lower() or 'noxii' in filename.lower():
                            new_tags.append('noxii-project')
                        if 'command' in directory.lower() or 'command' in filename.lower():
                            new_tags.append('on-command-project')
                        
                        # Try to read file content for additional tagging
                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read(500).lower()  # Read first 500 chars
                                
                                if 'content-type: text/x-zim-wiki' in content:
                                    new_tags.append('zim-wiki-format')
                                if any(word in content for word in ['character', 'dialogue', 'personality']):
                                    new_tags.append('character-design')
                                if any(word in content for word in ['weapon', 'armor', 'equipment', 'item']):
                                    new_tags.append('equipment')
                                if any(word in content for word in ['location', 'world', 'environment', 'setting']):
                                    new_tags.append('world-building')
                                if any(word in content for word in ['mechanic', 'gameplay', 'system', 'rules']):
                                    new_tags.append('game-mechanics')
                                if any(word in content for word in ['story', 'narrative', 'plot', 'quest']):
                                    new_tags.append('narrative')
                                if any(word in content for word in ['gdd', 'design document', 'game design']):
                                    new_tags.append('design-document')
                        except:
                            pass
                        
                        # Add new tags that aren't already present
                        for tag in new_tags:
                            if tag not in tags[relative_path]:
                                tags[relative_path].append(tag)
                                tagged_count += 1
        
        save_tags(tags)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'tagged': tagged_count}).encode())
    
    def serve_index(self):
        html = """<!DOCTYPE html>
<html>
<head>
    <title>Notebooks</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Anonymous+Pro:wght@400;700&display=swap');
        
        body { 
            font-family: 'Anonymous Pro', 'Courier New', monospace; 
            margin: 0; padding: 0; display: flex; height: 100vh; 
            background: #2c2e32;
            color: #c9c9c9;
            overflow: hidden;
            font-size: 14px;
        }
        
        .sidebar { 
            width: 320px; 
            background: #25272b;
            border-right: 1px solid #4a4c50; 
            overflow-y: auto; 
            padding: 15px;
            box-shadow: 2px 0 4px rgba(0,0,0,0.1);
        }
        
        .main { 
            flex: 1; 
            padding: 20px; 
            overflow-y: auto; 
            background: #2c2e32;
        }
        
        h2 {
            font-family: 'Courier Prime', monospace;
            font-weight: 700;
            color: #e8e8e8;
            margin-bottom: 15px;
            font-size: 16px;
            letter-spacing: 1px;
            border-bottom: 1px solid #4a4a4f;
            padding-bottom: 8px;
        }
        
        .view-tabs { 
            display: flex; 
            margin-bottom: 15px; 
            border: 1px solid #4a4c50;
            background: #1f2125;
            border-radius: 4px;
        }
        
        .view-tab { 
            padding: 10px 16px; 
            background: transparent;
            border: none; 
            cursor: pointer; 
            color: #c9c9c9;
            font-family: 'Anonymous Pro', monospace;
            font-size: 12px;
            flex: 1;
            text-align: center;
            transition: background-color 0.2s ease;
        }
        
        .view-tab:hover {
            background: #323236;
        }
        
        .view-tab.active { 
            background: #4a4a4f; 
            color: #fff;
            font-weight: bold;
        }
        
        .directory { 
            margin: 8px 0;
            border: 1px solid #4a4c50;
            background: #1f2125;
            border-radius: 4px;
        }
        
        .directory h3 { 
            margin: 0; 
            padding: 12px;
            color: #e8e8e8; 
            cursor: pointer; 
            font-size: 14px;
            font-family: 'Courier Prime', monospace;
            background: #34363a;
            border-bottom: 1px solid #4a4c50;
            transition: background-color 0.2s ease;
            border-radius: 4px 4px 0 0;
        }
        
        .directory h3:hover { 
            background: #3a3a3f;
        }
        
        .files { margin: 0; padding: 8px; }
        
        .file { 
            margin: 4px 0; 
            padding: 10px 12px; 
            background: #2a2a2e; 
            border: 1px solid #4a4a4f; 
            cursor: pointer; 
            font-size: 13px; 
            transition: background-color 0.2s ease;
            font-family: 'Anonymous Pro', monospace;
        }
        
        .file:hover { 
            background: #323236;
        }
        
        .file.active { 
            background: #5a5a5f; 
            color: #fff;
            font-weight: bold;
        }
        
        .file-tags { margin-top: 8px; }
        
        .tag { 
            display: inline-block; 
            padding: 3px 8px; 
            margin: 2px; 
            background: #4a4a4f;
            color: #c9c9c9; 
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #5a5a5f;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .tag:hover {
            background: #5a5a5f;
        }
        
        .content { 
            background: rgba(0,0,0,0.7); 
            border: 2px solid #00ff41; 
            padding: 20px; 
            white-space: pre-wrap; 
            font-family: 'Share Tech Mono', monospace; 
            line-height: 1.6;
            box-shadow: inset 0 0 20px rgba(0,255,65,0.1);
            position: relative;
        }
        
        .content::before {
            content: "";
            position: absolute;
            top: 10px; right: 10px;
            width: 20px; height: 20px;
            border: 2px solid #00ff41;
            border-radius: 50%;
            background: #00ff41;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        .content-header { 
            margin-bottom: 20px; 
            padding-bottom: 15px; 
            border-bottom: 2px solid rgba(0,255,65,0.3); 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start;
        }
        
        .content-title { 
            margin: 0; 
            color: #00ff41;
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: 20px;
            text-shadow: 0 0 10px #00ff41;
        }
        
        .content-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        
        .btn { 
            padding: 8px 16px; 
            border: 2px solid #00ff41; 
            background: rgba(0,0,0,0.5); 
            cursor: pointer; 
            font-size: 12px;
            color: #00ff41;
            font-family: 'Share Tech Mono', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: "";
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0,255,65,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        .btn:hover { 
            background: rgba(0,255,65,0.1);
            box-shadow: 0 0 15px rgba(0,255,65,0.3);
            transform: translateY(-2px);
        }
        
        .btn.primary { 
            background: #00ff41; 
            color: #000;
            font-weight: bold;
        }
        
        .btn.primary { 
            background: #4a4a4f;
            border-color: #5a5a5f;
        }
        
        .btn.primary:hover { 
            background: #5a5a5f;
        }
        
        .edit-area { display: none; }
        
        .edit-textarea { 
            width: 100%; 
            height: 400px; 
            font-family: 'Anonymous Pro', monospace; 
            border: 1px solid #4a4a4f; 
            padding: 15px;
            background: #1e1e22;
            color: #c9c9c9;
            resize: vertical;
            border-radius: 4px;
        }
        
        .edit-textarea:focus {
            outline: none;
            border-color: #6a6a6f;
        }
        
        .no-content { 
            color: #8a8a8f; 
            font-style: italic; 
            text-align: center; 
            padding: 60px;
            font-size: 16px;
        }
        
        .collapsible { display: none; }
        .expanded .collapsible { 
            display: block;
        }
        
        
        .status-info { 
            background: #323236;
            border: 1px solid #4a4a4f; 
            color: #c9c9c9; 
            padding: 12px; 
            margin-bottom: 15px;
            font-size: 11px;
            border-radius: 4px;
        }
        
        .tag-input { margin-top: 15px; }
        .tag-input input { 
            padding: 8px; 
            margin-right: 8px; 
            border: 1px solid #4a4a4f; 
            background: #1e1e22;
            color: #c9c9c9;
            font-family: 'Anonymous Pro', monospace;
            border-radius: 3px;
        }
        
        .tag-input input:focus {
            outline: none;
            border-color: #6a6a6f;
        }
        
        .search-box { margin-bottom: 15px; }
        .search-box input { 
            width: calc(100% - 20px); 
            padding: 12px; 
            border: 1px solid #4a4a4f; 
            background: #1e1e22;
            color: #c9c9c9;
            font-family: 'Anonymous Pro', monospace;
            border-radius: 4px;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: #6a6a6f;
        }
        
        .search-box input::placeholder {
            color: #8a8a8f;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #232327;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #4a4a4f;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #5a5a5f;
        }
        
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Repository Hub</h2>
        <p style="margin: 0 0 10px 0; font-size: 11px; color: #8a8a8f;">File browser • Direct editing</p>
        <div class="nav-links" style="margin-bottom: 10px;">
            <a href="http://localhost:8030" target="_blank" style="color: #c9c9c9; text-decoration: none; padding: 8px 12px; background: #323236; border: 1px solid #4a4a4f; border-radius: 3px; font-size: 11px; margin-right: 8px; display: inline-block;">📋 Forum View</a>
            <a href="http://localhost:3002" style="color: #e8e8e8; text-decoration: none; padding: 8px 12px; background: #4a4a4f; border: 1px solid #5a5a5f; border-radius: 3px; font-size: 11px; display: inline-block;">📂 File Browser</a>
        </div>
        <div class="status-info">
            <strong>Status:</strong> Direct editing mode - all changes save to original files.
        </div>
        
        <div class="view-tabs">
            <button class="view-tab active" onclick="switchView('all')">All Files</button>
            <button class="view-tab" onclick="switchView('folders')">Folders</button>
            <button class="view-tab" onclick="switchView('tags')">Tags</button>
        </div>
        
        <button onclick="autoTagFiles()" class="btn" style="width: 100%; margin-bottom: 10px;">[EXECUTE] AUTO-TAG PROTOCOL</button>
        
        <div class="search-box">
            <input type="text" id="search" placeholder="[SEARCH PROTOCOL]..." onkeyup="filterFiles()">
        </div>
        
        <div id="all-files-view">
            <div id="all-files"></div>
        </div>
        
        <div id="folders-view" style="display: none;">
            <div id="directories"></div>
        </div>
        
        <div id="tags-view" style="display: none;">
            <div id="tag-categories"></div>
        </div>
    </div>
    
    <div class="main">
        <div id="content">
            <div class="no-content">>> AWAITING INPUT... SELECT FILE TO DECRYPT <<</div>
        </div>
        
        <footer style="margin-top: 30px; padding: 15px 0; border-top: 1px solid #4a4a4f; text-align: center; font-size: 11px; color: #8a8a8f;">
            <strong>Repository Hub</strong> • 
            <a href="http://localhost:3002" style="color: #e8e8e8; text-decoration: none;">File Browser</a> • 
            <a href="http://localhost:8030" target="_blank" style="color: #c9c9c9; text-decoration: none;">Forum View</a>
        </footer>
    </div>
    
    <script>
        let currentActiveFile = null;
        let currentDirectory = '';
        let currentFile = '';
        let isEditing = false;
        let allTags = {};
        
        async function loadDirectories() {
            const response = await fetch('/api/directories');
            const dirs = await response.json();
            const container = document.getElementById('directories');
            
            dirs.forEach(dir => {
                const dirDiv = document.createElement('div');
                dirDiv.className = 'directory';
                dirDiv.innerHTML = '<h3 onclick="toggleDirectory(this)">' + dir + '</h3><div class="files collapsible" id="files-' + dir + '"></div>';
                container.appendChild(dirDiv);
                loadFiles(dir);
            });
        }
        
        async function loadTags() {
            const response = await fetch('/api/tags');
            allTags = await response.json();
            displayTagView();
        }
        
        function displayTagView() {
            const container = document.getElementById('tag-categories');
            container.innerHTML = '';
            
            const tagsByCategory = {};
            
            Object.entries(allTags).forEach(([filePath, tags]) => {
                tags.forEach(tag => {
                    if (!tagsByCategory[tag]) tagsByCategory[tag] = [];
                    tagsByCategory[tag].push(filePath);
                });
            });
            
            Object.entries(tagsByCategory).forEach(([tag, files]) => {
                const tagDiv = document.createElement('div');
                tagDiv.className = 'directory';
                tagDiv.innerHTML = '<h3 onclick="toggleDirectory(this)">' + tag + ' (' + files.length + ')</h3><div class="files collapsible" id="tag-' + tag + '"></div>';
                container.appendChild(tagDiv);
                
                const filesContainer = document.getElementById('tag-' + tag);
                files.forEach(filePath => {
                    const [directory, file] = filePath.split('/');
                    const fileDiv = document.createElement('div');
                    fileDiv.className = 'file';
                    fileDiv.textContent = file;
                    fileDiv.onclick = () => {
                        const contentDiv = document.getElementById('content');
                        contentDiv.innerHTML = '<div class="no-content">>> ACCESSING DATA STREAM... <<</div>';
                        setTimeout(() => loadContent(directory, file, fileDiv), 300);
                    };
                    filesContainer.appendChild(fileDiv);
                });
            });
        }
        
        function switchView(view) {
            document.querySelectorAll('.view-tab').forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            document.getElementById('all-files-view').style.display = view === 'all' ? 'block' : 'none';
            document.getElementById('folders-view').style.display = view === 'folders' ? 'block' : 'none';
            document.getElementById('tags-view').style.display = view === 'tags' ? 'block' : 'none';
            
            if (view === 'all') {
                loadAllFiles();
            } else if (view === 'tags') {
                loadTags();
            }
        }
        
        async function loadAllFiles() {
            const response = await fetch('/api/all-files');
            const files = await response.json();
            const container = document.getElementById('all-files');
            container.innerHTML = '';
            
            files.forEach(fileInfo => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file';
                fileDiv.innerHTML = `
                    <div>${fileInfo.name}</div>
                    <small style="color: #666;">${fileInfo.directory}</small>
                    <div class="file-tags" id="tags-${fileInfo.directory}-${fileInfo.name}"></div>
                `;
                fileDiv.onclick = () => {
                    // Add terminal-style loading effect
                    const contentDiv = document.getElementById('content');
                    contentDiv.innerHTML = '<div class="no-content">>> DECRYPTING FILE... PLEASE WAIT <<</div>';
                    setTimeout(() => loadContent(fileInfo.directory, fileInfo.name, fileDiv), 300);
                };
                container.appendChild(fileDiv);
                displayFileTags(fileInfo.directory, fileInfo.name);
            });
        }
        
        async function autoTagFiles() {
            // Add loading effect
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '[PROCESSING...]';
            btn.disabled = true;
            
            // Simulate typing effect for status
            await typeText(btn, '[ANALYZING FILES...]');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const response = await fetch('/api/auto-tag', { method: 'POST' });
            if (response.ok) {
                const result = await response.json();
                await typeText(btn, `[COMPLETE] ${result.tagged} FILES TAGGED`);
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
                
                loadTags();
                if (document.getElementById('all-files-view').style.display !== 'none') {
                    loadAllFiles();
                }
            }
        }
        
        async function typeText(element, text) {
            element.textContent = '';
            for (let i = 0; i < text.length; i++) {
                element.textContent += text[i];
                await new Promise(resolve => setTimeout(resolve, 30));
            }
        }
        
        // Add sound effects simulation
        function playClickSound() {
            // Visual feedback as "sound"
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: fixed; top: 10px; right: 10px;
                color: #00ff41; font-size: 12px;
                font-family: 'Share Tech Mono', monospace;
                opacity: 1; transition: opacity 0.5s ease;
                pointer-events: none; z-index: 1000;
            `;
            indicator.textContent = '[CLICK]';
            document.body.appendChild(indicator);
            
            setTimeout(() => {
                indicator.style.opacity = '0';
                setTimeout(() => document.body.removeChild(indicator), 500);
            }, 200);
        }
        
        // Add click sounds to interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .file, .view-tab, .directory h3')) {
                playClickSound();
            }
        });
        
        function filterFiles() {
            const search = document.getElementById('search').value.toLowerCase();
            document.querySelectorAll('.file').forEach(file => {
                if (file.textContent.toLowerCase().includes(search)) {
                    file.style.display = 'block';
                } else {
                    file.style.display = 'none';
                }
            });
        }
        
        function toggleDirectory(header) {
            const directory = header.parentElement;
            directory.classList.toggle('expanded');
        }
        
        async function loadFiles(directory) {
            const response = await fetch('/api/files/' + encodeURIComponent(directory));
            const files = await response.json();
            const container = document.getElementById('files-' + directory);
            
            files.forEach(file => {
                const fileDiv = document.createElement('div');
                fileDiv.className = 'file';
                fileDiv.innerHTML = file + '<div class="file-tags" id="tags-' + directory + '-' + file + '"></div>';
                fileDiv.onclick = () => loadContent(directory, file, fileDiv);
                container.appendChild(fileDiv);
                displayFileTags(directory, file);
            });
        }
        
        function displayFileTags(directory, file) {
            const filePath = directory + '/' + file;
            const tags = allTags[filePath] || [];
            const container = document.getElementById('tags-' + directory + '-' + file);
            if (container) {
                container.innerHTML = tags.map(tag => '<span class="tag">' + tag + '</span>').join('');
            }
        }
        
        async function loadContent(directory, file, fileElement) {
            if (currentActiveFile) {
                currentActiveFile.classList.remove('active');
            }
            fileElement.classList.add('active');
            currentActiveFile = fileElement;
            currentDirectory = directory;
            currentFile = file;
            
            const response = await fetch('/api/content/' + encodeURIComponent(directory) + '/' + encodeURIComponent(file));
            const content = await response.text();
            const container = document.getElementById('content');
            
            const filePath = directory + '/' + file;
            const tags = allTags[filePath] || [];
            
            container.innerHTML = `
                <div class="content-header">
                    <div>
                        <h2 class="content-title">${file}</h2>
                        <small>From: ${directory}</small>
                        <div class="tag-input">
                            <input type="text" id="new-tag" placeholder="Add tag..." onkeypress="if(event.key==='Enter') addTag()">
                            <button onclick="addTag()" class="btn">Add Tag</button>
                            <div>${tags.map(tag => '<span class="tag" onclick="removeTag(\\'' + tag + '\\')">× ' + tag + '</span>').join('')}</div>
                        </div>
                    </div>
                    <div class="content-actions">
                        <button onclick="toggleEdit()" class="btn" id="edit-btn">Edit</button>
                        <button onclick="saveFile()" class="btn primary" id="save-btn" style="display: none;">Save</button>
                        <button onclick="cancelEdit()" class="btn" id="cancel-btn" style="display: none;">Cancel</button>
                    </div>
                </div>
                <div id="view-area" class="content">${content}</div>
                <div id="edit-area" class="edit-area">
                    <textarea id="edit-textarea" class="edit-textarea">${content}</textarea>
                </div>
            `;
            
            container.scrollTop = 0;
            isEditing = false;
        }
        
        function toggleEdit() {
            isEditing = !isEditing;
            document.getElementById('view-area').style.display = isEditing ? 'none' : 'block';
            document.getElementById('edit-area').style.display = isEditing ? 'block' : 'none';
            document.getElementById('edit-btn').style.display = isEditing ? 'none' : 'inline-block';
            document.getElementById('save-btn').style.display = isEditing ? 'inline-block' : 'none';
            document.getElementById('cancel-btn').style.display = isEditing ? 'inline-block' : 'none';
        }
        
        function cancelEdit() {
            toggleEdit();
        }
        
        async function saveFile() {
            const content = document.getElementById('edit-textarea').value;
            const response = await fetch('/api/save/' + encodeURIComponent(currentDirectory) + '/' + encodeURIComponent(currentFile), {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: content
            });
            
            if (response.ok) {
                document.getElementById('view-area').textContent = content;
                toggleEdit();
                alert('File saved successfully!');
            } else {
                alert('Error saving file');
            }
        }
        
        async function addTag() {
            const tagInput = document.getElementById('new-tag');
            const tag = tagInput.value.trim();
            if (!tag) return;
            
            const filePath = currentDirectory + '/' + currentFile;
            const response = await fetch('/api/tag/' + encodeURIComponent(filePath), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: tag, action: 'add' })
            });
            
            if (response.ok) {
                tagInput.value = '';
                loadContent(currentDirectory, currentFile, currentActiveFile);
                loadTags();
            }
        }
        
        async function removeTag(tag) {
            const filePath = currentDirectory + '/' + currentFile;
            const response = await fetch('/api/tag/' + encodeURIComponent(filePath), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: tag, action: 'remove' })
            });
            
            if (response.ok) {
                loadContent(currentDirectory, currentFile, currentActiveFile);
                loadTags();
            }
        }
        
        loadDirectories();
        loadTags();
        loadAllFiles();
    </script>
</body>
</html>"""
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(html.encode())
    
    def serve_directories(self):
        dirs = [d for d in os.listdir(NOTEBOOKS_DIR) if os.path.isdir(os.path.join(NOTEBOOKS_DIR, d))]
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(dirs).encode())
    
    def serve_files(self):
        directory = unquote(self.path.split('/')[-1])
        dir_path = os.path.join(NOTEBOOKS_DIR, directory)
        if os.path.exists(dir_path):
            files = [f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(files).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def serve_content(self):
        parts = self.path.split('/')
        directory = unquote(parts[-2])
        filename = unquote(parts[-1])
        file_path = os.path.join(NOTEBOOKS_DIR, directory, filename)
        
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(content.encode())
            except Exception as e:
                self.send_response(500)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    os.chdir("/home/user/Repository")
    with socketserver.TCPServer(("", PORT), NotebookHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print(f"Serving notebooks from: {NOTEBOOKS_DIR}")
        httpd.serve_forever()