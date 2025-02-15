<details>
<summary><em>src/components/BasicScene/BasicScene.tsx</em></summary>

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function BasicScene() {
  return (
    <Canvas style={{ width: '100%', height: '400px', background: '#222' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <OrbitControls />

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
}
</details>