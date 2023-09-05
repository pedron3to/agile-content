import dynamic from "next/dynamic";

const SearchIcon = dynamic(() => import("./SearchIcon"));
const SearchInput = dynamic(() => import("./SearchInput"));

export { SearchIcon, SearchInput };
