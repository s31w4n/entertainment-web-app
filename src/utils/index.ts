import { Media } from "@/types";

export const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const FIREBASE_ENDPOINT: string = process.env.FIREBASE_ENDPOINT!;

// Get All the Data
async function getAllData() {
  const url = FIREBASE_ENDPOINT;
  const response = await fetch(url);
  const data: Media[] = await response.json();

  return data;
}

// Get Trending Media
export async function getTrending() {
  const data = await getAllData();
  const trendingData = data.filter((item) => item.isTrending === true);

  return trendingData;
}

// Get Recommended Media
export async function getRecommended() {
  const data = await getAllData();
  const recommendedData = data.filter((item) => item.isTrending === false);

  return recommendedData;
}

// Get Movies
export async function getMovies() {
  const data = await getAllData();
  const movies = data.filter((item) => item.category === "Movie");

  return movies;
}

// Get Series
export async function getSeries() {
  const data = await getAllData();
  const series = data.filter((item) => item.category === "TV Series");

  return series;
}

// Get Bookmarks
export async function getBookmarks() {
  const data = await getAllData();
  const bookmarks = data.filter((item) => item.isBookmarked === true);

  return bookmarks;
}

// Get Media Details By ID
export async function getMediaDetails(id: number) {
  const data = await getAllData();
  const details = data.filter((item) => item.id === id);

  return details[0];
}
