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