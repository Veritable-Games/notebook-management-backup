import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const WikiConstellation = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const dodecahedronRef = useRef(null);
  const constellationGroupRef = useRef(null);
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // Scene setup
        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(0x000000);
        
        // Camera setup
        const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        cameraRef.current.position.set(0, 2, 5);

        // Renderer setup
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(rendererRef.current.domElement);

        // Controls setup
        controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;

        // Create dodecahedron
        const geometry = new THREE.DodecahedronGeometry(1);
        const material = new THREE.MeshBasicMaterial({ 
          color: 0x444444,
          wireframe: true 
        });
        dodecahedronRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(dodecahedronRef.current);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        sceneRef.current.add(ambientLight, pointLight);

        // Create constellation group
        constellationGroupRef.current = new THREE.Group();
        sceneRef.current.add(constellationGroupRef.current);

        // Try to fetch initial data
        await spawnConstellation();

        if (mounted) {
          setIsLoading(false);
        }

        // Start animation
        animate();
      } catch (err) {
        console.error('Initialization error:', err);
        if (mounted) {
          setError('Failed to initialize 3D scene');
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  const spawnConstellation = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pages');
      if (!response.ok) throw new Error('Failed to fetch pages');
      
      const data = await response.json();
      if (!data.entries || !Array.isArray(data.entries)) {
        throw new Error('Invalid data format');
      }

      data.entries.forEach(title => {
        const point = createPoint(title);
        constellationGroupRef.current?.add(point);
      });
    } catch (err) {
      console.error('Failed to spawn constellation:', err);
      setError('Failed to load wiki entries');
    }
  };

  const createPoint = (title) => {
    const geometry = new THREE.SphereGeometry(0.05);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const point = new THREE.Mesh(geometry, material);
    
    // Random position in a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2 + Math.random();
    
    point.position.x = r * Math.sin(phi) * Math.cos(theta);
    point.position.y = r * Math.sin(phi) * Math.sin(theta);
    point.position.z = r * Math.cos(phi);
    
    point.userData.title = title;
    return point;
  };

  const animate = () => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    requestAnimationFrame(animate);
    
    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.x += 0.001;
      dodecahedronRef.current.rotation.y += 0.001;
    }

    controlsRef.current?.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  const cleanup = () => {
    if (rendererRef.current && containerRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
    }
    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
  };

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-screen bg-black" />
  );
};

export default WikiConstellation;