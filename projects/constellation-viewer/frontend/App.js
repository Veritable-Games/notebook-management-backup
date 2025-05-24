import React from 'react';
import './App.css';
import WikiConstellation from './WikiConstellation';

function App() {
  return (
    <div className="App">
      <WikiConstellation />
      <div id="tooltip" className="hidden fixed p-2 bg-black text-white rounded shadow-lg"></div>
      <div id="infoContainer" className="hidden fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
        <button id="closeButton" className="absolute top-4 right-4">×</button>
        <div id="pageContent"></div>
      </div>
      <div id="editContainer" className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        <form id="editForm" className="space-y-4">
          <input id="titleInput" type="text" placeholder="Title" className="w-full p-2 border rounded" />
          <textarea id="contentInput" placeholder="Content" className="w-full p-2 border rounded h-32"></textarea>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => document.getElementById('editContainer').style.display = 'none'} 
                    className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
