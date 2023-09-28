import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

function useSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery]);

  return { searchQuery, setSearchQuery, isLoading, debouncedSearchQuery };
}

export default useSearch;
