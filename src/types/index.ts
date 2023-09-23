// Media Type
export interface Media {
  id: number;
  title: string;
  description: string;
  backdrop_path: string;
  poster_path: string;
  genres: string[];
  duration: string;
  language: string;
  category: string;
  year: string;
  status: string;
  rating: string;
  vote_average: number;
  isTrending: boolean;
  isBookmarked: boolean;
}

// Home Page Props
export interface HomePageProps {
  trending: Media[];
  recommended: Media[];
}

// Movies Page Props
export interface MoviePageProps {
  movies: Media[];
}

// Series Page Props
export interface SeriesPageProps {
  series: Media[];
}

export interface BookmarkPageProps {
  bookmarks: Media[];
}

export interface DetailsPageProps {
  data: Media;
}

// Collection Props
export interface CollectionProps {
  data: Media[];
  title: string;
}

// Heading Props
export interface HeadingProps {
  title: string;
}

// Card Props
export interface CardProps {
  title: string;
  category: string;
  year: string;
  rating: string;
  backdrop_path: string;
  isBookmarked: boolean;
  id: number;
}

// Card Image Props
export interface CardImageProps {
  isTrending?: boolean;
  backdrop_path: string;
  alt: string;
  category: string;
  id: number;
}

// Card Info Props
export interface CardInfoProps {
  title: string;
  category: string;
  year: string;
  rating: string;
  isTrending?: boolean;
}

// Card Hover Props
export interface CardHoverProps {
  hover: boolean;
  id: number;
  category: string;
}

// Bookmark Button Props
export interface BookmarkButtonProps {
  isTrending?: boolean;
  isBookmarked: boolean;
}

// Search Button Props
export interface SearchButtonProps {
  category: string;
  id: number;
}
