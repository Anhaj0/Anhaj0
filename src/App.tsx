import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, ScrollControls } from '@react-three/drei';
import Scene from './components/Scene';

function App() {
  return (
    <div className="w-full h-screen bg-[#f4f4f4] text-gray-800">
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
        <color attach="background" args={['#f4f4f4']} />

        {/* Soft, warm lighting for a "clay" or elegant minimal look */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          {/* ScrollControls will wrap the scene to drive scroll-based animations */}
          <ScrollControls pages={5} damping={0.25}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none text-gray-500 flex flex-col items-center animate-bounce">
        <span className="text-sm font-semibold mb-2">Scroll Down & Click Objects</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
}

export default App;
