'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// --- Configuration ---
const SEPARATION = 100;
const AMOUNTX = 50; // Adjusted for screen width (Original was 100, can be heavy on some devices)
const AMOUNTY = 50; // Adjusted for screen height (Original was 70)
const PARTICLE_SIZE = 40; // Scale multiplier to match the visual size of the original canvas circles

// --- Texture Generation ---
// Creates a simple circle texture to mimic the original 'context.arc' drawing
const getCircleTexture = () => {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  
  if (context) {
    context.clearRect(0, 0, 32, 32);
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const Particles = () => {
  const meshRef = useRef(null);
  const count = useRef(0);
  const { camera, viewport } = useThree();
  
  // Create a reusable object for calculations (avoids creating new objects every frame)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const circleTexture = useMemo(() => getCircleTexture(), []);

  // --- Animation Loop ---
  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Camera Movement (Exact replication of legacy logic)
    // Original used pixels (mouseX). We use normalized pointer (-1 to +1) scaled up.
    // We multiply by 1000 to match the scale of the scene (since SEPARATION is 100).
    const targetX = state.pointer.x * 1000; 
    const targetY = state.pointer.y * 1000;

    // The '.05' is the easing factor from the original code
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(meshRef.current.position);

    // 2. Wave Animation
    let i = 0;
    const particlesCount = count.current;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        
        // --- Position Calculation ---
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        
        // Exact Math.sin formula from the original code
        const y = (Math.sin((ix + particlesCount) * 0.3) * 50) + 
                  (Math.sin((iy + particlesCount) * 0.5) * 50);

        dummy.position.set(x, y, z);

        // --- Scale Calculation ---
        // Exact scale formula from the original code
        // Note: We create a base scale and apply it to the object
        const scaleVal = (Math.sin((ix + particlesCount) * 0.3) + 1) * 1 + 
                         (Math.sin((iy + particlesCount) * 0.5) + 1) * 1;
        
        dummy.scale.set(scaleVal, scaleVal, scaleVal);
        
        // Apply changes to the specific instance
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        
        i++;
      }
    }

    // Tell the GPU the positions have updated
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Increment the wave counter (original was 0.1)
    count.current += 0.1;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, AMOUNTX * AMOUNTY]}
    >
      {/* Visual representation: A plane always facing the camera (Billboard) */}
      <planeGeometry args={[PARTICLE_SIZE, PARTICLE_SIZE]} />
      <meshBasicMaterial 
        map={circleTexture} 
        color={0xe1e1e1} 
        transparent={true}
        depthWrite={false} // Prevents transparency sorting issues
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default function WaveScene() {
  return (
    <div className='w-3/4 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
      <Canvas
        camera={{ 
          position: [0, 0, 1000], // Original Z position
          fov: 75, // Original was 120, but 75 looks better on modern wide screens. 
                   // Set to 120 if you want the exact "fish-eye" look.
          far: 100000 
        }}
        dpr={[1, 2]} // Handle high-DPI screens (Retina)
      >
        <Particles />
      </Canvas>
    </div>
  );
}