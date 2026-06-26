import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const urlModelo = '/Casita%20y%20monas1.glb';

const ModeloPrincipal = () => {
  const { scene } = useGLTF(urlModelo);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((mat) => {
              const orig = mat as THREE.Material & { color?: THREE.Color; map?: THREE.Texture | null };
              const newMat = new THREE.MeshBasicMaterial({
                color: orig.color || new THREE.Color(0xffffff),
                map: orig.map || null,
              });
              orig.dispose();
              return newMat;
            });
          } else {
            const originalMaterial = mesh.material as THREE.Material & {
              color?: THREE.Color;
              map?: THREE.Texture | null;
            };

            const newMaterial = new THREE.MeshBasicMaterial({
              color: originalMaterial.color || new THREE.Color(0xffffff),
              map: originalMaterial.map || null,
            });

            mesh.material = newMaterial;
            originalMaterial.dispose();
          }
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

useGLTF.preload(urlModelo);

const TVCanvas: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAction = (action: 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut') => {
    const controls = controlsRef.current;
    if (!controls) return;

    const angleStep = 0.1;
    const zoomFactor = 0.9;

    switch (action) {
      case 'right':
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() + angleStep);
        break;
      case 'left':
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() - angleStep);
        break;
      case 'up':
        controls.setPolarAngle(controls.getPolarAngle() - angleStep);
        break;
      case 'down':
        controls.setPolarAngle(controls.getPolarAngle() + angleStep);
        break;
      case 'zoomIn': {
        const camera = controls.object;
        const target = controls.target;
        camera.position.lerp(target, 1 - zoomFactor);
        controls.update();
        break;
      }
      case 'zoomOut': {
        const camera = controls.object;
        const target = controls.target;
        const dir = new THREE.Vector3().subVectors(camera.position, target).multiplyScalar(1 / zoomFactor);
        camera.position.copy(target).add(dir);
        controls.update();
        break;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        handleAction('right');
        break;
      case 'ArrowLeft':
        handleAction('left');
        break;
      case 'ArrowUp':
        handleAction('up');
        break;
      case 'ArrowDown':
        handleAction('down');
        break;
      case '+':
      case 'PageUp':
        handleAction('zoomIn');
        break;
      case '-':
      case 'PageDown':
        handleAction('zoomOut');
        break;
    }
  };

  useEffect(() => {
    // Enfocar automáticamente el canvas al montar el componente
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full h-full relative outline-none focus:ring-4 focus:ring-blue-500"
    >
      <Canvas
        gl={{
          powerPreference: 'low-power',
          antialias: false,
        }}
        dpr={1}
        shadows={false}
        camera={{ position: [0, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <Center top position={[0, -1, 0]}>
          <ModeloPrincipal />
        </Center>
        <OrbitControls
          ref={controlsRef}
          autoRotate={false}
          enableDamping={true}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>

      {/* Controles en Pantalla (PC / TV) */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-20 pointer-events-auto">
        <div className="flex gap-2 justify-center">
          <button 
            tabIndex={0}
            className="bg-black/80 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-gray-700 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-xl" 
            onClick={() => handleAction('up')}
          >↑</button>
        </div>
        <div className="flex gap-2 justify-center">
          <button 
            tabIndex={0}
            className="bg-black/80 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-gray-700 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-xl" 
            onClick={() => handleAction('left')}
          >←</button>
          <button 
            tabIndex={0}
            className="bg-black/80 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-gray-700 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-xl" 
            onClick={() => handleAction('down')}
          >↓</button>
          <button 
            tabIndex={0}
            className="bg-black/80 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-gray-700 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-xl" 
            onClick={() => handleAction('right')}
          >→</button>
        </div>
        <div className="flex gap-4 justify-center mt-2">
          <button 
            tabIndex={0}
            className="bg-blue-600 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-blue-500 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-2xl" 
            onClick={() => handleAction('zoomIn')}
          >+</button>
          <button 
            tabIndex={0}
            className="bg-blue-600 text-white w-14 h-14 rounded-full border border-white/20 hover:bg-blue-500 transition-colors outline-none focus:ring-2 focus:ring-white font-bold text-2xl" 
            onClick={() => handleAction('zoomOut')}
          >-</button>
        </div>
      </div>
    </div>
  );
};

export default TVCanvas;
