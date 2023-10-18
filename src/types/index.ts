// Media Type
export interface Media {
  id: number;
  title: string;
  tagline: string;
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
  bookmarked: boolean;
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
  isBookmarking: boolean;
  onClick: () => void;
}

// Search Button Props
export interface SearchButtonProps {
  category: string;
  id: number;
}

// Details Image Props
export interface DetailsImageProps {
  poster_path: string;
  title: string;
  isBookmarked: boolean;
}

// Details Title Props
export interface DetailsTitleProps {
  title: string;
}

// Details Rating Props
export interface DetailsRatingProps {
  vote_average: number;
}

// Details Info Props
export interface DetailsInfoProps {
  duration: string;
  language: string;
  year: string;
  status: string;
}

// Details Synopsis Props
export interface DetailsSynopsisProps {
  description: string;
}

// Details Genres Props
export interface DetailsGenresProps {
  genres: string[];
}

// Loading Props
export interface LoadingProps {
  width?: string;
  height?: string;
}

// Auth Form Props
export interface AuthFormProps {
  isLogin: boolean;
  loginHandler: () => void;
}

// Auth Input Props
export interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  content: string;
  placeholder: string;
  onChange: (value: string) => void;
  error: string;
}

// Auth Button Props
export interface AuthButtonProps {
  isLoading: boolean;
  text: string;
  onClick?: () => void;
}

// Notification Props
export interface NotificationProps {
  active?: boolean;
  field?: string;
  message: string;
  status: string;
}

// useBookmark Props
export interface useBookmarkProps {
  title: string;
  bookmarked: boolean;
  handleNotification: (result: NotificationProps) => void;
}
