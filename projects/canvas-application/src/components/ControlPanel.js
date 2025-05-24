import React from 'react';

const ControlPanel = ({ excalidrawAPI }) => {
  const handleSave = () => {
    if (!excalidrawAPI) return;
    
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    
    const data = JSON.stringify({ elements, appState });
    localStorage.setItem('excalidraw-data', data);
    
    alert('Drawing saved!');
  };
  
  const handleLoad = () => {
    if (!excalidrawAPI) return;
    
    const savedData = localStorage.getItem('excalidraw-data');
    if (savedData) {
      try {
        const { elements, appState } = JSON.parse(savedData);
        excalidrawAPI.updateScene({ elements, appState });
        alert('Drawing loaded!');
      } catch (error) {
        console.error('Error loading saved data:', error);
        alert('Error loading drawing');
      }
    } else {
      alert('No saved drawing found');
    }
  };
  
  const handleClear = () => {
    if (!excalidrawAPI) return;
    
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      excalidrawAPI.resetScene();
    }
  };
  
  return (
    <div className="control-panel">
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default ControlPanel;