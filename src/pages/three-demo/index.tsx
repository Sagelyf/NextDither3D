<details>
<summary><em>src/pages/three-demo/index.tsx</em></summary>

import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const BasicScene = dynamic(() => import('../../components/BasicScene/BasicScene'), { ssr: false });
const DitherDemo = dynamic(() => import('../../components/DitherDemo/DitherDemo'), { ssr: false });

export default function ThreeDemoPage() {
  return (
    <>
      <Head>
        <title>3D Demo</title>
      </Head>

      <h1>React Three Fiber Demo</h1>
      <p>Below is a basic rotating box with OrbitControls:</p>
      <BasicScene />

      <h1>Dither Demo</h1>
      <p>Below is an example sphere that could use a custom dithering material:</p>
      <DitherDemo />
    </>
  );
}
</details>
//