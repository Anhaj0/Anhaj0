import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface RoomObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  title: string;
  onClick: () => void;
  isActive: boolean;
  geometry: React.ReactNode;
}

export default function RoomObject({ position, rotation = [0, 0, 0], color, title, onClick, isActive, geometry }: RoomObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_state) => {
    if (meshRef.current) {
      if (isActive) {
        // Subtle rotation when active
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {geometry}
          <meshStandardMaterial
            color={isActive ? '#ff7b00' : (hovered ? '#ff9b40' : color)}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Label */}
      <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div className={`transition-opacity duration-300 ${hovered || isActive ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 text-sm font-bold text-gray-800 whitespace-nowrap">
            {title}
          </div>
        </div>
      </Html>
    </group>
  );
}
