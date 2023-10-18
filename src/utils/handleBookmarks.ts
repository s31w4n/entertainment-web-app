// Handle Bookmarks
export async function handleBookmarks(
  method: string = "GET",
  title: string = "",
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (title) {
    options.body = JSON.stringify({ title });
  }

  const response = await fetch("/api/user/handle-bookmarks", options);
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
