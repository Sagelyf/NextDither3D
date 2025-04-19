<summary><em>src/components/GraphViewer/GraphViewer.tsx</em></summary>

import React, { useMemo } from 'react';
import Mermaid from 'react-mermaid';
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
      <Mermaid id="mermaid-graph" config={{ startOnLoad: true }} graphDefinition={graphDefinition} />
    </div>
  );
};

/* The type declaration for 'react-mermaid' is now in a separate file under 'src/types/react-mermaid.d.ts'. */
