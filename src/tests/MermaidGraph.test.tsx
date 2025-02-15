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