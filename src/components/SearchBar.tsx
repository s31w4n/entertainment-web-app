import React from "react";
import { SearchIcon } from "@/assets/icons";

interface Props {
  placeholder: string;
}

const SearchBar: React.FC<Props> = ({ placeholder }) => {
  return (
    <form className="flex grow gap-4 pb-6 md:pb-8 lg:mt-16">
      <SearchIcon className="h-6 w-6 md:h-8 md:w-8" />
      <input
        type="text"
        placeholder={placeholder}
        className="md:text-placeholder:heading-md line text-base placeholder:text-base w-full rounded-none border-b border-app-dark-blue bg-app-dark-blue pb-1 font-light leading-6 caret-app-red placeholder:text-app-placeholder focus:border-b-app-greyish-blue focus:outline-none md:pb-2 md:text-app-heading-md"
      />
    </form>
  );
};

export default SearchBar;
