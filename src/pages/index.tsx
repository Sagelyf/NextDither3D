
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

