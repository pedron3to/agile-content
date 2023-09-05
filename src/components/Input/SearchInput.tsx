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
import { SearchIcon } from ".";
import CloseIcon from "../CloseIcon";

export interface SearchInputProps {
  isSelected?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearInput?: () => void;
  onEnter?: () => void;
  setIsSelected?: Dispatch<SetStateAction<boolean>>;
  value: string;
}

const SearchInput = ({
  isSelected = false,
  onChange,
  handleClearInput,
  onEnter,
  setIsSelected = () => {},
  value,
}: SearchInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const focusedContainerClassName = [
    "w-full px-10 border relative shadow-md",
    isInputFocused ? "border-blue-500 border-2" : "border-gray-300",
    "rounded-full focus:outline-none focus:ring-2",
    " focus:ring-blue-500 focus:border-blue-500",
    `${isSelected && "scale-120 w-[500px]"}`,
  ].join(" ");

  const searchIconClassName = [
    "absolute top-3 ",
    `${isSelected ? "left-4" : "left-3"} `,
  ].join(" ");

  const closeIconClassName = [
    "absolute top-2.5 w-3 h-3 cursor-pointer",
    `${isSelected ? "right-6" : "right-6"} `,
    "z-100",
  ].join(" ");

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

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
  }, [setIsInputFocused]);

  return (
    <div className={focusedContainerClassName}>
      <motion.input
        id="Search"
        type="search"
        value={value}
        placeholder="Search..."
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2  focus:outline-none"
      />
      <motion.div
        id="search-icon"
        className={searchIconClassName}
        animate={{ scale: isSelected ? 1.2 : 1 }}
      >
        <SearchIcon />
      </motion.div>

      {value && (
        <motion.div
          className={closeIconClassName}
          animate={{ scale: isSelected ? 1.2 : 1 }}
          onClick={handleClearInput}
        >
          <CloseIcon color="gray" />
        </motion.div>
      )}
    </div>
  );
};

export default SearchInput;
