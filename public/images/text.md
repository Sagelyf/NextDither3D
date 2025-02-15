Below is a comprehensive Next.js project structure that includes:
	1.	A Masonry-style /art page with lazy loading via react-masonry-css.
	2.	A 3D demo section (e.g., /three-demo) using React Three Fiber for testing your dithering or other 3JS experiments.
	3.	A Mermaid graph page (e.g., /graph) that visualizes the same media data as /art, but in a node-graph style.

It uses TypeScript, SCSS modules, and a few modern React libraries (to keep the stack relatively lean).

	Note:
		•	The code snippets are “skeletons” or minimal examples.
	•	You will likely customize the data fetching, the 3D content, and the exact Mermaid syntax to match your real use-cases.
	•	This example uses react-mermaid2 as a straightforward way to integrate Mermaid diagrams into React.

Full Project Structure

my-app/
├─ public/
│   └─ images/
│       ├─ art1.jpg
│       ├─ art2.jpg
│       ├─ art3.jpg
│       └─ ...
├─ src/
│   ├─ components/
│   │   ├─ ArtFeed/
│   │   │   ├─ MasonryFeed.module.scss
│   │   │   ├─ MasonryFeed.tsx
│   │   │   └─ MasonryItem.tsx
│   │   ├─ DitherDemo/
│   │   │   ├─ DitherDemo.tsx
│   │   │   └─ DitherDemo.module.scss
│   │   ├─ GraphViewer/
│   │   │   ├─ GraphViewer.tsx
│   │   │   └─ GraphViewer.module.scss
│   │   ├─ BasicScene/
│   │   │   └─ BasicScene.tsx
│   │   └─ ...
│   ├─ data/
│   │   └─ artData.ts
│   ├─ pages/
│   │   ├─ art/
│   │   │   └─ index.tsx
│   │   ├─ graph/
│   │   │   └─ index.tsx
│   │   ├─ three-demo/
│   │   │   └─ index.tsx
│   │   ├─ _app.tsx
│   │   ├─ index.tsx
│   │   └─ ...
│   ├─ styles/
│   │   ├─ globals.scss
│   │   └─ ...
│   ├─ tests/
│   │   ├─ MasonryFeed.test.tsx
│   │   ├─ GraphViewer.test.tsx
│   │   └─ ...
│   ├─ contexts/
│   │   └─ ...
│   └─ ...
├─ package.json
├─ tsconfig.json
├─ next.config.js
└─ README.md

Below are expanded file contents to get you started.

1) Shared Data: artData.ts

We’ll keep a simple array of objects that represent your media items. Both the masonry feed and graph page can import from here.

<details>
<summary><em>src/data/artData.ts</em></summary>


// src/data/artData.ts
export interface ArtItem {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  // ...any other fields you want
}

export const ART_DATA: ArtItem[] = [
  { id: 1, title: 'Artwork #1', imageUrl: '/images/art1.jpg' },
  { id: 2, title: 'Artwork #2', imageUrl: '/images/art2.jpg' },
  { id: 3, title: 'Artwork #3', imageUrl: '/images/art3.jpg' },
  // ...
];

</details>


2) Masonry Feed: MasonryFeed.tsx

Uses:
	•	react-masonry-css for a responsive masonry layout.
	•	Lazy-loading via <img loading="lazy" /> or next/image (depending on your preference).
	•	A simple intersection observer approach for infinite scroll or a “Load More” button. (Below we show a “Load More” button for simplicity.)

<details>
<summary><em>src/components/ArtFeed/MasonryFeed.tsx</em></summary>


import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { ArtItem } from '../../data/artData';
import styles from './MasonryFeed.module.scss';
import { MasonryItem } from './MasonryItem';

interface MasonryFeedProps {
  initialItems: ArtItem[];
  // Optionally pass a function to fetch more
  onLoadMore?: () => ArtItem[] | Promise<ArtItem[]>;
}

export const MasonryFeed: React.FC<MasonryFeedProps> = ({ initialItems, onLoadMore }) => {
  const [items, setItems] = useState<ArtItem[]>(initialItems);

  const breakpointColumnsObj = {
    default: 4, // 4 columns on large screens
    1100: 3,
    768: 2,
    500: 1,
  };

  const handleLoadMore = async () => {
    if (!onLoadMore) return;
    const newItems = await onLoadMore();
    setItems((prev) => [...prev, ...newItems]);
  };

  return (
    <div className={styles.masonryContainer}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        {items.map((item) => (
          <MasonryItem key={item.id} item={item} />
        ))}
      </Masonry>

      {onLoadMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

</details>


MasonryItem.tsx

<details>
<summary><em>src/components/ArtFeed/MasonryItem.tsx</em></summary>


import React from 'react';
import { ArtItem } from '../../data/artData';
import styles from './MasonryFeed.module.scss';

// If you want to use Next.js <Image>, import it:
// import Image from 'next/image';

interface MasonryItemProps {
  item: ArtItem;
}

export const MasonryItem: React.FC<MasonryItemProps> = ({ item }) => {
  return (
    <div className={styles.masonryItem}>
      {/* Using a standard <img> with lazy loading: */}
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        className={styles.artImage}
      />

      <div className={styles.hoverOverlay}>
        <h3>{item.title}</h3>
      </div>
    </div>
  );
};

</details>


Masonry SCSS

<details>
<summary><em>src/components/ArtFeed/MasonryFeed.module.scss</em></summary>


.masonryContainer {
  padding: 2rem;
  background: #111;
}

/* react-masonry-css classes */
.myMasonryGrid {
  display: flex;
  margin-left: -1rem; /* space for gutter */
  width: auto;
}

.myMasonryGridColumn {
  padding-left: 1rem; /* gutter size */
  background-clip: padding-box;
}

.masonryItem {
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  .artImage {
    width: 100%;
    display: block;
    border-radius: 6px;
    transition: transform 0.3s ease;
  }

  &:hover .artImage {
    transform: scale(1.05);
  }

  .hoverOverlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  &:hover .hoverOverlay {
    transform: translateY(0);
  }
}

/* Load more button container */
.loadMoreContainer {
  text-align: center;
  margin-top: 1rem;

  button {
    background-color: #444;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #666;
    }
  }
}

</details>


3) /art/index.tsx Page

Renders the MasonryFeed with data from ART_DATA. We can do a simple “load more” approach for demonstration.

<details>
<summary><em>src/pages/art/index.tsx</em></summary>


import React from 'react';
import Head from 'next/head';
import { MasonryFeed } from '../../components/ArtFeed/MasonryFeed';
import { ART_DATA, ArtItem } from '../../data/artData';

export default function ArtPage() {
  // Example: a "fetch more" function that returns a few more items
  const handleLoadMore = async (): Promise<ArtItem[]> => {
    // In real usage, you might fetch from an API or DB
    // Here we’ll just mock new data by duplicating existing data
    const nextId = Date.now();
    return [
      { id: nextId, title: 'New Artwork #1', imageUrl: '/images/art2.jpg' },
      { id: nextId + 1, title: 'New Artwork #2', imageUrl: '/images/art3.jpg' },
    ];
  };

  return (
    <>
      <Head>
        <title>Sagelyf Art Feed</title>
      </Head>
      <MasonryFeed initialItems={ART_DATA} onLoadMore={handleLoadMore} />
    </>
  );
}

</details>


4) 3D Demo with React Three Fiber

BasicScene.tsx (Minimal)

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


DitherDemo.tsx (Example Dithering)

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


DitherDemo.module.scss

<details>
<summary>Example SCSS</summary>


/* src/components/DitherDemo/DitherDemo.module.scss */
.ditherContainer {
  margin: 2rem 0;
  text-align: center;
  width: 100%;
  height: auto;
}

</details>


5) /three-demo/index.tsx Page

Dynamically import your 3D components (SSR off) so they only run client-side.

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


6) Mermaid Graph Page

We’ll use react-mermaid2 to render a Mermaid diagram. We’ll also show how to transform your ART_DATA into a Mermaid graph string. This is just one approach— you could hand-write the diagram, or more dynamically generate edges/nodes based on relationships.

Install:

npm install react-mermaid2

GraphViewer.tsx (core component)

<details>
<summary><em>src/components/GraphViewer/GraphViewer.tsx</em></summary>


import React, { useMemo } from 'react';
import Mermaid from 'react-mermaid2';
import styles from './GraphViewer.module.scss';
import { ArtItem } from '../../data/artData';

/**
 * Takes an array of ArtItems and converts them into a simple Mermaid graph definition.
 * For example: 
 * graph LR
 *    1[Artwork #1] --> 2[Artwork #2]
 *    2 --> 3[Artwork #3]
 */
function generateMermaidGraph(data: ArtItem[]): string {
  let mermaidString = 'graph LR\n';
  // Example: link each item to the next, or some arbitrary logic
  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i];
    const next = data[i + 1];
    // Node shape: id[title]
    mermaidString += `    ${current.id}[${current.title}] --> ${next.id}[${next.title}]\n`;
  }
  return mermaidString;
}

interface GraphViewerProps {
  items: ArtItem[];
}

export const GraphViewer: React.FC<GraphViewerProps> = ({ items }) => {
  // Generate the Mermaid graph from items
  const graphDefinition = useMemo(() => generateMermaidGraph(items), [items]);

  return (
    <div className={styles.graphContainer}>
      <Mermaid chart={graphDefinition} />
    </div>
  );
};

</details>


GraphViewer.module.scss

<details>
<summary>Example SCSS</summary>


/* src/components/GraphViewer/GraphViewer.module.scss */
.graphContainer {
  background: #222;
  padding: 2rem;
  color: #fff;
  overflow-x: auto;
  border-radius: 6px;

  /* The .mermaid class is used by react-mermaid2 for styling */
  .mermaid {
    background: transparent;
    color: #fff;
  }
}

</details>


/graph/index.tsx Page

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


When you load /graph, it will:
	•	Take the same art items used by /art.
	•	Show them as a Mermaid flow chart.
	•	If you want more advanced linking, you can expand your generateMermaidGraph() logic or store “relationships” in your data.

7) Global Styles & _app.tsx

Wrap your entire app in _app.tsx so that SCSS and any global providers are available. Also, import globals.scss here.

<details>
<summary><em>src/pages/_app.tsx</em></summary>


import type { AppProps } from 'next/app';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

</details>


globals.scss

<details>
<summary>Example SCSS</summary>


/* src/styles/globals.scss */
html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #000;
  color: #fff;
}

h1, h2, h3 {
  margin: 1rem 0;
}

a {
  color: #0af;
  text-decoration: none;
}

</details>


8) Index Page: pages/index.tsx

A simple landing page that links to /art, /three-demo, and /graph.

<details>
<summary><em>src/pages/index.tsx</em></summary>


import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Sagelyf</h1>
      <p>Choose a demo:</p>
      <ul>
        <li><Link href="/art">Art Feed (Masonry)</Link></li>
        <li><Link href="/three-demo">3D Demo</Link></li>
        <li><Link href="/graph">Art Graph (Mermaid)</Link></li>
      </ul>
    </div>
  );
}

</details>


9) Tests Folder (Optional)

You can add basic tests using React Testing Library or Cypress. For example:

<details>
<summary><em>src/tests/MasonryFeed.test.tsx</em></summary>


import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MasonryFeed } from '../components/ArtFeed/MasonryFeed';
import { ART_DATA } from '../data/artData';

test('renders initial items in the masonry feed', () => {
  render(<MasonryFeed initialItems={ART_DATA} />);
  // Check if the first item is displayed
  const firstItem = screen.getByAltText('Artwork #1');
  expect(firstItem).toBeInTheDocument();
});

</details>


<details>
<summary><em>src/tests/GraphViewer.test.tsx</em></summary>


import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GraphViewer } from '../components/GraphViewer/GraphViewer';
import { ART_DATA } from '../data/artData';

test('renders mermaid graph with data', () => {
  render(<GraphViewer items={ART_DATA} />);
  // We expect some mermaid container to appear
  expect(screen.getByText('Artwork #1')).toBeInTheDocument();
});

</details>


10) Package.json (Key Dependencies)

Below is an example package.json snippet showing the relevant dependencies:

{
  "name": "sagelyf",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest --watch" // or "npm run cypress"
  },
  "dependencies": {
    "next": "^13.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-masonry-css": "^1.0.16",
    "react-mermaid2": "^3.1.3",
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",
    "three": "^0.149.x",
    "sass": "^1.62.0"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@types/jest": "^29.x",
    "typescript": "^4.x",
    "jest": "^29.x",
    "@testing-library/react": "^13.x",
    "@testing-library/jest-dom": "^5.x"
  }
}

11) Tips & Notes
	1.	Mermaid Customization
	•	You can define custom themes or Mermaid configurations in react-mermaid2 by passing a config prop.
	•	For more advanced relationships, expand your data model or store adjacency info (e.g., links: number[] to link an item to others).
	2.	Performance
	•	For large images, consider next/image or a library like react-lazyload-image.
	•	For infinite scroll, you can integrate react-intersection-observer and auto-trigger new fetches instead of a “Load More” button.
	3.	3D Dithering
	•	The provided DitherDemo is just a placeholder. Replace it with your real dithering code or “react-dither3d” if you have that.
	4.	Deployment
	•	Deploy to Vercel or Netlify by linking your GitHub repo (github.com/mcochranca/Sgael, etc.).
	•	The pages/ approach is standard for Next.js routing, so once you deploy, you’ll have routes at /art, /three-demo, /graph, etc.
	5.	CSS
	•	We used SCSS modules for each component to keep styles modular.
	•	The global styling is in globals.scss.
	•	If you prefer plain CSS or styled-components, adjust accordingly.

This structure should give you:
	•	A full Next.js app with your masonry feed (/art), 3D demo area (/three-demo), and mermaid graph (/graph).
	•	Shared data (ART_DATA) so the same artworks appear in the feed and in the graph.
	•	SCSS modules for each component, plus global SCSS.
	•	The flexibility to expand your 3D or dithering demos any way you like.

Feel free to rename directories or refactor as needed—this layout is merely a solid starting point for your Sagelyf/art project.