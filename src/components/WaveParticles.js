'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// --- Configuration ---
const SEPARATION = 100;
const AMOUNTX = 50; // Adjusted for screen width (Original was 100, can be heavy on some devices)
const AMOUNTY = 50; // Adjusted for screen height (Original was 70)
const PARTICLE_SIZE = 5; // Reduced particle size for less visual density

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
  
  // Create gradient colors with blue as dominant color
  const colors = useMemo(() => {
    const colorArray = new Float32Array(AMOUNTX * AMOUNTY * 3);
    const blueBase = new THREE.Color(0x39b7f2); // rgb(57, 183, 242) - project blue
    const cyanLight = new THREE.Color(0x5fd4ff); // lighter cyan-blue
    const blueDark = new THREE.Color(0x1e90d4); // darker blue
    
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Create gradient based on position
        const xFactor = ix / AMOUNTX;
        const yFactor = iy / AMOUNTY;
        
        // Mix colors to create gradient (mostly blue with variations)
        const color = new THREE.Color();
        if (xFactor < 0.33) {
          color.lerpColors(blueBase, cyanLight, yFactor);
        } else if (xFactor < 0.66) {
          color.copy(blueBase); // Pure project blue in the middle
        } else {
          color.lerpColors(blueBase, blueDark, yFactor);
        }
        
        colorArray[i * 3] = color.r;
        colorArray[i * 3 + 1] = color.g;
        colorArray[i * 3 + 2] = color.b;
        i++;
      }
    }
    return colorArray;
  }, []);

  // --- Animation Loop ---
  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Camera Movement (Exact replication of legacy logic)
    // Original used pixels (mouseX). We use normalized pointer (-1 to +1) scaled up.
    // Reduced sensitivity by lowering multiplier from 1000 to 400
    const targetX = state.pointer.x * 400; 
    const targetY = state.pointer.y * 400;

    // Reduced easing factor from 0.05 to 0.02 for more dampened movement
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (-targetY - camera.position.y) * 0.02;
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
    
    // Reduced animation speed from 0.1 to 0.05 for slower movement
    count.current += 0.02;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, AMOUNTX * AMOUNTY]}
    >
      {/* Visual representation: A plane always facing the camera (Billboard) */}
      <planeGeometry args={[PARTICLE_SIZE, PARTICLE_SIZE]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </planeGeometry>
      <meshBasicMaterial 
        map={circleTexture} 
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false} // Prevents transparency sorting issues
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default function WaveScene() {
  return (
    <div className='w-3/4 h-3/4 absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
      <Canvas
        camera={{ 
          position: [0, 0, 1500], // Zoomed out from 1000 to 1500 for wider view
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