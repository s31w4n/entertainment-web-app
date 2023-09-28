import React from "react";
import { SearchIcon } from "@/assets/icons";

interface Props {
  placeholder: string;
  searchQuery: string | undefined;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  searchQuery,
  setSearchQuery,
}) => {
  
  return (
    <form className="flex grow gap-4 pb-6 md:pb-8 lg:mt-16">
      <SearchIcon className="h-6 w-6 md:h-8 md:w-8" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-none border-b border-app-dark-blue bg-app-dark-blue pb-1 font-light leading-6 caret-app-red placeholder:text-app-placeholder focus:border-b-app-greyish-blue focus:outline-none md:pb-2 md:text-app-heading-md"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
    </form>
  );
};

export default SearchBar;
