import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Excalidraw } from "@excalidraw/excalidraw";
import CollaborationPanel from './components/CollaborationPanel';

function App() {
  const excalidrawRef = useRef(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [excalidrawModule, setExcalidrawModule] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  
  // Load Excalidraw module dynamically to avoid parsing issues
  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) => {
      setExcalidrawModule(module);
    });
  }, []);
  
  // Set up a MutationObserver to watch for when the excalidrawRef becomes available
  useEffect(() => {
    // Check immediately in case it's already available
    if (excalidrawRef.current && !excalidrawAPI) {
      console.log("Excalidraw API is ready (initial check)");
      setExcalidrawAPI(excalidrawRef.current);
    }

    // Set up a timer to check periodically
    const checkInterval = setInterval(() => {
      if (excalidrawRef.current && !excalidrawAPI) {
        console.log("Excalidraw API is ready (interval check)");
        setExcalidrawAPI(excalidrawRef.current);
      }
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [excalidrawAPI]);
  
  const toggleViewMode = () => {
    setViewModeEnabled(!viewModeEnabled);
  };

  const handleSave = () => {
    if (!excalidrawRef.current) return;
    
    try {
      const elements = excalidrawRef.current.getSceneElements();
      // Clone elements and remove any potentially problematic properties
      const cleanElements = elements.map(el => ({
        id: el.id,
        type: el.type,
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height,
        angle: el.angle,
        strokeColor: el.strokeColor,
        backgroundColor: el.backgroundColor,
        fillStyle: el.fillStyle,
        strokeWidth: el.strokeWidth,
        strokeStyle: el.strokeStyle,
        roughness: el.roughness,
        opacity: el.opacity,
        points: el.points ? [...el.points] : undefined,
        text: el.text,
        fontSize: el.fontSize,
        fontFamily: el.fontFamily,
        textAlign: el.textAlign,
        verticalAlign: el.verticalAlign
      }));
      
      const appState = excalidrawRef.current.getAppState();
      // Only save essential app state properties
      const cleanAppState = {
        viewBackgroundColor: appState.viewBackgroundColor,
        zoom: appState.zoom,
        scrollX: appState.scrollX,
        scrollY: appState.scrollY
      };
      
      const data = JSON.stringify({ elements: cleanElements, appState: cleanAppState });
      localStorage.setItem('canvas-data', data);
      
      alert('Drawing saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save drawing. Check console for details.');
    }
  };
  
  const handleLoad = () => {
    if (!excalidrawRef.current) return;
    
    const savedData = localStorage.getItem('canvas-data');
    if (savedData) {
      try {
        const { elements, appState } = JSON.parse(savedData);
        
        // Force required properties for each element
        const validatedElements = elements.map(el => ({
          ...el,
          // Ensure all elements have the required properties
          type: el.type || "rectangle",
          x: el.x || 0,
          y: el.y || 0,
          width: el.width || 0,
          height: el.height || 0,
          // Add empty versions of potentially missing properties
          strokeColor: el.strokeColor || "#000000",
          backgroundColor: el.backgroundColor || "transparent"
        }));
        
        // Update the scene
        excalidrawRef.current.updateScene({ 
          elements: validatedElements,
          appState: appState || { viewBackgroundColor: '#ffffff' }
        });
        
        alert('Drawing loaded successfully!');
      } catch (error) {
        console.error('Error loading saved data:', error);
        alert('Error loading drawing. Check console for details.');
      }
    } else {
      alert('No saved drawing found');
    }
  };
  
  const handleClear = () => {
    if (!excalidrawRef.current) return;
    
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      // Reset scene with empty elements array instead of using the built-in reset
      excalidrawRef.current.updateScene({ 
        elements: [],
        appState: {
          viewBackgroundColor: '#ffffff'
        }
      });
    }
  };

  // Handle changes for collaboration
  const handleChange = (elements, appState) => {
    if (excalidrawRef.current && excalidrawRef.current.onChange) {
      excalidrawRef.current.onChange(elements, appState);
    }
  };

  if (!excalidrawModule) {
    return <div>Loading Excalidraw...</div>;
  }
  
  // Function to be used as a ref callback
  const excalidrawRefCallback = (instance) => {
    excalidrawRef.current = instance;
    if (instance && !excalidrawAPI) {
      console.log("Excalidraw instance received via ref callback");
      setExcalidrawAPI(instance);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Canvas</h1>
        <div className="header-controls">
          <button onClick={toggleViewMode}>
            {viewModeEnabled ? 'Edit Mode' : 'View Mode'}
          </button>
          <CollaborationPanel excalidrawAPI={excalidrawAPI} />
        </div>
      </header>
      <div className="control-panel">
        <div className="control-group">
          <button 
            onClick={handleSave} 
            className="control-button"
            title="Save drawing to local storage"
          >
            <span role="img" aria-label="Save">💾</span> Save
          </button>
          <button 
            onClick={handleLoad} 
            className="control-button"
            title="Load drawing from local storage"
          >
            <span role="img" aria-label="Load">📂</span> Load
          </button>
        </div>
        
        <div className="control-group">
          <button 
            onClick={handleClear} 
            className="control-button danger"
            title="Clear all elements from canvas"
          >
            <span role="img" aria-label="Clear">🗑️</span> Clear All
          </button>
        </div>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRefCallback}
          initialData={{
            elements: [],
            appState: {
              viewBackgroundColor: '#ffffff'
            },
          }}
          viewModeEnabled={viewModeEnabled}
          onChange={handleChange}
          onCollabButtonClick={event => {
            // Prevent default excalidraw collaboration  
            event.preventDefault();
          }}
          renderTopRightUI={() => null}
          zenModeEnabled={false}
          gridModeEnabled={true}
          theme="light"
          name="VG-Canvas Drawing"
        />
      </div>
    </div>
  );
}

export default App;
