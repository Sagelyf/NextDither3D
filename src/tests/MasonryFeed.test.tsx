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
