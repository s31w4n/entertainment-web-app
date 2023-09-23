import { TMDB_ENDPOINT, TMDB_API_KEY } from "../utils";

export function getURL(endpoint: string, page?: number) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`;
}

export function getGenre(endpoint: string) {
  return `${TMDB_ENDPOINT}/${endpoint}?api_key=${TMDB_API_KEY}`;
}

export function getMovieDetails(id: number) {
  return `${TMDB_ENDPOINT}/movie/${id}?api_key=${TMDB_API_KEY}`;
}

export function getMovieCasts(id: number) {
  return `${TMDB_ENDPOINT}/movie/${id}/credits?api_key=${TMDB_API_KEY}`;
}

export function getSeriesDetails(id: number) {
  return `${TMDB_ENDPOINT}/tv/${id}?api_key=${TMDB_API_KEY}`;
}

export function getSeriesCasts(id: number) {
  return `${TMDB_ENDPOINT}/tv/${id}/credits?api_key=${TMDB_API_KEY}`;
}

// Search for Movies and Series
export function search(query: string, page: number) {
  return `${TMDB_ENDPOINT}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`;
}

// Search for Movies only
export function searchMovie(query: string, page: number) {
  return `${TMDB_ENDPOINT}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`;
}

// Search for Series only
export function searchSeries(query: string, page: number) {
  return `${TMDB_ENDPOINT}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    query,
  )}&page=${page}`;
}
