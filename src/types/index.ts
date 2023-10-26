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
  session: any;
  allData: Media[];
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
  id: number;
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
  id: number;
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
export interface AuthFormProps {}

// Auth Input Props
export interface AuthInputProps {
  id: string;
  type: string;
  placeholder: string;
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
  id: number;
  handleNotification: (result: NotificationProps) => void;
}

// User Props
export interface UserProps {
  accessToken: string | any;
  auth: any;
  displayName: string;
  email: string | any;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any;
  phoneNumber: any;
  photoURL: string | any;
  proactiveRefresh: any;
  providerData: any;
  providerId: string | any;
  reloadListener: any | null;
  reloadUserInfo: any;
  tenantId: any | null;
  uid: string;
}

// Media Thunk Props
export interface MediaThunkProps {
  background?: string;
  date?: string;
  poster_path: string;
  id: number;
  title: string;
}
