

📝 Key Highlights
1. 📂 src/core/shaders/DitherMaterial.ts
• The core GLSL shader logic for dithering, exposed as a Three.js material.
2. 📂 src/core/DitherController.ts
• A JavaScript class to dynamically update fade/dithering properties based on camera distance.
3. 📂 src/pages/three-demo/index.tsx
• Interactive demo page for showcasing NextDither3D in a web-based 3D scene.
4. 📂 src/components/DitherDemo.tsx
• A reusable React component demonstrating how to use the shader in React Three Fiber.
5. 📂 tests/
• Includes unit tests for shader parameters and dynamic fading behavior.
6. 📂 public/textures/
• Contains an example dithering pattern texture (8×8 or 16×16).
7. 📄 next.config.js
• Advanced Next.js configuration (if needed for custom WebGL setup).

🚀 Installation Guide

# Step 1: Clone the repo
git clone https://github.com/your-username/nextdither3d.git
cd nextdither3d

# Step 2: Install dependencies
npm install  # or yarn install

# Step 3: Run the development server
npm run dev  # or yarn dev

📌 How It Works
	•	The DitherMaterial shader applies an alpha-test dithering fade effect.
	•	The DitherController dynamically updates the fade effect based on distance to camera.
	•	Works in plain Three.js or React Three Fiber with a simple <mesh> component.

📘 Usage Examples

🖼️ React Three Fiber

```
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { DitherMaterial } from "nextdither3d";

export default function App() {
  const ditherTex = useTexture("/textures/ditherPattern.png");
  const mat = useMemo(() => {
    const m = new DitherMaterial();
    m.uniforms.uDitherTex.value = ditherTex;
    m.uniforms.uFadeStart.value = 5.0;
    m.uniforms.uFadeEnd.value = 15.0;
    return m;
  }, [ditherTex]);

  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <primitive attach="material" object={mat} />
      </mesh>
    </Canvas>
  );
}
```

🖼️ Plain Three.js

```
import * as THREE from 'three';
import { DitherMaterial } from 'nextdither3d';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

const ditherTex = new THREE.TextureLoader().load('textures/ditherPattern.png');

const mat = new DitherMaterial();
mat.uniforms.uDitherTex.value = ditherTex;
mat.transparent = true;
mat.depthWrite = false;

const cube = new THREE.Mesh(new THREE.BoxGeometry(), mat);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

🛠️ Contributing

1. Fork this repository
2. Create a branch for your feature:

```
git checkout -b feature/my-new-feature
```
3. Commit & push your changes:

```
git commit -m "Add new fade logic"
git push origin feature/my-new-feature
```

4. Create a Pull Request 🎉

📜 License

This project is MIT Licensed. It is inspired by Rune’s Dither3D, which is also MIT-licensed.

🌐 Connect

<div>


</div>


📌 Final Thoughts
• Supports both Three.js & React Three Fiber
• Uses efficient cutout dithering for smooth LOD fades
• Perfect for games, AR/VR, and stylized 3D visuals
• Optimized for Next.js, WebGL, and TypeScript

🚀 Start using NextDither3D today! 🚀
