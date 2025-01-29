export type Show = {
    title: string;
    thumbnail: {
        trending: {
            small: string;
            large: string;
        };
        regular: {
            small: string;
            medium: string;
            large: string;
        };
    };
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
};

/**
 *     "adult": false,
      "backdrop_path": "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
      "genre_ids": [
        28,
        878,
        35,
        10751
      ],
      "id": 939243,
      "original_language": "en",
      "original_title": "Sonic the Hedgehog 3",
      "overview": "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
      "popularity": 4739.045,
      "poster_path": "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      "release_date": "2025-01-15",
      "title": "Sonic the Hedgehog 3",
      "video": false,
      "vote_average": 7.866,
      "vote_count": 1183
 * 
 */

export type Media = {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
    media_type: string;
}