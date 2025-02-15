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