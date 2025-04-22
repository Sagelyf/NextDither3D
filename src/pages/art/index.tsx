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
