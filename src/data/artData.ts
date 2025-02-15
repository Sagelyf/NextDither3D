<details>
    <summary><em>src/data/artData.ts</em></summary>
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