<details>
<summary><em>src/components/DitherDemo/DitherDemo.tsx</em></summary>


import React from 'react';
import { Canvas } from '@react-three/fiber';
// If you have a custom dither library, import it here
// import { useDitherMaterial } from 'react-dither3d'; 
import styles from './DitherDemo.module.scss';

export default function DitherDemo() {
  // Example usage of custom dither material:
  // const ditherMaterial = useDitherMaterial({ /* config */ });

  return (
    <div className={styles.ditherContainer}>
      <Canvas style={{ background: '#111', width: '100%', height: '400px' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />

        {/* Example geometry */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
          {/* <mesh material={ditherMaterial} /> */}
        </mesh>
      </Canvas>
    </div>
  );
}
</details>