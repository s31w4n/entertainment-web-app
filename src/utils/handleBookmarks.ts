import { getAllData, FIREBASE_ENDPOINT } from ".";

// Handle Bookmarks
export async function handleBookmarks(
  method: string = "GET",
  id: number = NaN,
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (id) {
    options.body = JSON.stringify({ id });
  }

  const response = await fetch("/api/user/handle-bookmarks", options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API request failed: ${errorData.message}`);
  }
  const data = await response.json();

  if (!response.ok) {
    return {
      error: {
        message: data.message,
        field: data.filed,
      },
    };
  }
  return data;
}
