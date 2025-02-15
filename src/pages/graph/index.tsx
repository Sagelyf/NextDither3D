<details>
<summary><em>src/pages/graph/index.tsx</em></summary>

import React from 'react';
import Head from 'next/head';
import { ART_DATA } from '../../data/artData';
import { GraphViewer } from '../../components/GraphViewer/GraphViewer';

export default function GraphPage() {
  return (
    <>
      <Head>
        <title>Mermaid Graph of Art</title>
      </Head>
      <h1>Art Items as a Mermaid Graph</h1>
      <GraphViewer items={ART_DATA} />
    </>
  );
}

</details>
// Compare this snippet from src/pages/three-demo/index.tsx:

