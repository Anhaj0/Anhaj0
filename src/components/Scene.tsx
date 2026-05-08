import { useState, useRef } from 'react';
import { useScroll, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import RoomObject from './objects/RoomObject';
import Overlay from './ui/Overlay';

export default function Scene() {
  const scroll = useScroll();
  const [activeObject, setActiveObject] = useState<string | null>(null);

  // Camera reference for custom movement
  const cameraGroupRef = useRef<THREE.Group>(null);
  const targetCameraPos = useRef(new THREE.Vector3(0, 2, 10));
  const targetCameraLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Objects Data
  const objects = [
    {
      id: 'summary',
      title: 'Professional Summary',
      position: [0, 0, 0] as [number, number, number],
      color: '#d97706', // Amber (warm, no blue/purple)
      geometry: <boxGeometry args={[1.5, 1, 1]} /> // represents a desk/computer
    },
    {
      id: 'experience',
      title: 'Work Experience',
      position: [5, 1, -5] as [number, number, number],
      color: '#10b981', // Emerald
      geometry: <cylinderGeometry args={[0.5, 0.5, 2, 32]} /> // pillar of experience
    },
    {
      id: 'projects',
      title: 'Projects & Automation',
      position: [-5, 1, -10] as [number, number, number],
      color: '#ef4444', // Red
      geometry: <torusGeometry args={[0.8, 0.3, 16, 100]} /> // gear-like/nodes
    },
    {
      id: 'education',
      title: 'Education',
      position: [4, 0, -15] as [number, number, number],
      color: '#14b8a6', // Teal
      geometry: <coneGeometry args={[1, 1.5, 4]} /> // pyramid
    },
    {
      id: 'contact',
      title: 'Contact',
      position: [0, 1, -20] as [number, number, number],
      color: '#f59e0b', // Yellow
      geometry: <icosahedronGeometry args={[1, 0]} /> // complex gem
    }
  ];

  useFrame((_state, delta) => {
    // 1. Calculate base camera position from scroll if no object is active
    if (!activeObject) {
      const offset = scroll.offset; // 0 to 1

      // Calculate position along the Z axis based on scroll
      // We start at Z=10 and go to Z=-25
      const zPos = 10 - (offset * 35);

      // Add slight X/Y movement for a "floating through space" feel
      const xPos = Math.sin(offset * Math.PI * 2) * 2;
      const yPos = 2 + Math.cos(offset * Math.PI * 2) * 0.5;

      targetCameraPos.current.set(xPos, yPos, zPos);

      // Look slightly ahead
      targetCameraLookAt.current.set(xPos * 0.5, 1, zPos - 5);
    } else {
      // 2. If object active, move camera to focus on it
      const activeData = objects.find(o => o.id === activeObject);
      if (activeData) {
        // Position camera slightly offset from the object
        targetCameraPos.current.set(
          activeData.position[0] + 0,
          activeData.position[1] + 1,
          activeData.position[2] + 4
        );
        targetCameraLookAt.current.set(
          activeData.position[0],
          activeData.position[1],
          activeData.position[2]
        );
      }
    }

    // Smoothly interpolate current camera position to target
    if (cameraGroupRef.current) {
      cameraGroupRef.current.position.lerp(targetCameraPos.current, delta * 4);

      // Smoothly look at target
      const lookAtDummy = new THREE.Object3D();
      lookAtDummy.position.copy(cameraGroupRef.current.position);
      lookAtDummy.lookAt(targetCameraLookAt.current);
      cameraGroupRef.current.quaternion.slerp(lookAtDummy.quaternion, delta * 4);
    }
  });

  // Handle click outside objects to reset view
  const handleBackgroundClick = () => {
    if (activeObject) {
      setActiveObject(null);
    }
  };

  return (
    <group onPointerMissed={handleBackgroundClick}>
      {/* Dynamic Camera Group */}
      <group ref={cameraGroupRef} position={[0, 2, 10]}>
        <PerspectiveCamera makeDefault fov={50} />
      </group>

      {/* Floor - repeating grid style instead of pure flat for better depth perception */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -10]} receiveShadow>
        <planeGeometry args={[100, 200]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.8} />
        <gridHelper args={[100, 100, '#d1d5db', '#d1d5db']} position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Interactive Objects */}
      {objects.map((obj) => (
        <RoomObject
          key={obj.id}
          position={obj.position}
          color={obj.color}
          title={obj.title}
          isActive={activeObject === obj.id}
          onClick={() => setActiveObject(obj.id === activeObject ? null : obj.id)}
          geometry={obj.geometry}
        />
      ))}

      {/* HTML UI Overlay rendered via R3F's Html */}
      <Html fullscreen zIndexRange={[100, 0]}>
        <Overlay activeSection={activeObject} onClose={() => setActiveObject(null)} />
      </Html>
    </group>
  );
}
