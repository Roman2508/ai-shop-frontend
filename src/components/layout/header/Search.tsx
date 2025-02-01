import { Input } from "@/components/ui/common/Input";
import React from "react";

const Search = () => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
        <img
          width="16px"
          height="16px"
          src="https://icons.veryicon.com/png/o/miscellaneous/monochrome-icon-1/search-521.png"
        />
      </span>

      <Input variant="search" placeholder="Пошук..." className="pr-10 w-[340]" />
    </div>
  );
};

export default Search;
