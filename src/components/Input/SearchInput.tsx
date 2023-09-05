"use client";
import React, {
  KeyboardEvent,
  Dispatch,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  SetStateAction,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import SearchIcon from "./SearchIcon";

export interface SearchInputProps {
  isSelected?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  setIsSelected?: Dispatch<SetStateAction<boolean>>;
  value: string;
}

const SearchInput = ({
  isSelected = false,
  onChange,
  onEnter,
  setIsSelected = () => {},
  value,
}: SearchInputProps) => {
  const inputClassName = [
    "w-full pl-10 pr-4 py-2 border border-gray-300",
    "rounded-full focus:outline-none focus:ring-2",
    " focus:ring-blue-500 focus:border-blue-500",
    `${isSelected && "scale-120 w-[500px]"}`,
  ].join(" ");

  const searchIconClassName = [
    "absolute top-3 ",
    `${isSelected ? "-left-2 md:-left-4 lg:-left-14 xl:-left-28" : "left-3"} `,
  ].join(" ");

  const inputRef = useRef<HTMLInputElement>(null);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (key === "Escape") setIsSelected(false);

      if (event.key === "Enter") onEnter && onEnter();
    },
    [onEnter, setIsSelected]
  );

  const handleInputFocus = useCallback(() => {
    setIsSelected(true);
    setIsInputFocused(true);
  }, [setIsSelected, setIsInputFocused]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        event.target !== document.querySelector("#search-button")
      ) {
        setIsSelected(false);
      }
    },
    [inputRef, setIsSelected]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSelected, handleClickOutside]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.input
        id="Search"
        type="search"
        ref={inputRef}
        value={value}
        placeholder="Search for animals..."
        onFocus={handleInputFocus}
        onBlur={() => {
          if (!isInputFocused) {
            setIsSelected(false);
          }
        }}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={inputClassName}
      />
      <motion.div
        id="search-icon"
        className={searchIconClassName}
        animate={{ scale: isSelected ? 1.2 : 1 }}
      >
        <SearchIcon />
      </motion.div>
    </div>
  );
};

export default SearchInput;
