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

export async function getBookmarkData() {
  const data = await getAllData();
  const userBookmarks = await handleBookmarks();

  try {
    if (userBookmarks.length !== 0) {
      const updatedData = data.map((item) => {
        if (userBookmarks.includes(item.id)) {
          // If the item's ID is in the user's bookmarks, mark it as bookmarked.
          item.isBookmarked = true;
        }
        return item;
      });

      // Make an HTTP request to update the data in Firebase
      const response = await fetch(FIREBASE_ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Data updated successfully.");
      } else {
        console.error("Failed to update data.");
      }
      // Return the updatedData items
      return updatedData;
    }
  } catch (error) {
    console.log(error);
  }
}
