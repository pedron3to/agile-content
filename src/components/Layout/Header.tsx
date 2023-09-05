"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import useDeviceType from "@/hooks/useDeviceType";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store";
import { setIsloading, setValue } from "@/store/slice/search.slice";
import { resetAnimal } from "@/store/slice/animal.slice";
import { SearchInput } from "../Input";

interface HeaderProps {
  isSelected?: boolean;
  isHomePage?: boolean;
}

const width = 272;
const height = 92;
const scaleFactor = 0.3;

const newWidth = width * scaleFactor;
const newHeight = height * scaleFactor;

const headerClassName =
  "shadow-md flex flex-row items-center justify-between py-2 px-4 bg-white";
const logoClassName = "mr-2";
const imageClassName =
  "inline-block outline-none align-middle rounded-md box-border mx-2";
const clientLogoClassName = "mr-2 rounded-full";

const searchContainer =
  "flex flex-col items-start justify-center md:flex-row md:items-center md:justify-start w-full";

const Header = ({ isSelected = false, isHomePage = true }: HeaderProps) => {
  const search = useSelector((state: RootState) => state.searchReducer.value);
  const dispatch = useDispatch();
  const { isMobile } = useDeviceType();

  const [searchValue, setSearchValue] = useState(search);
  const debouncedValue = useDebounce(searchValue, 2000);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      dispatch(setIsloading(true));
      dispatch(resetAnimal());
    },
    [setSearchValue, dispatch]
  );

  useEffect(() => {
    dispatch(setValue(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <motion.header
      className={headerClassName}
      animate={{ opacity: isSelected ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {isHomePage ? (
        <div>
          <span className="font-semibold">Agile Content </span>
          <span>FrontEnd test</span>
        </div>
      ) : (
        <div className={searchContainer}>
          <Link href={"/"} className="mb-2 md:mb-0">
            <Image
              src="/google_logo_small.svg"
              alt="Logo"
              width={newWidth}
              height={newHeight}
              className={logoClassName}
            />
          </Link>

          <div className="w-full md:w-1/3">
            <SearchInput value={searchValue} onChange={handleChange} />
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="flex flex-row items-center h-12">
          <Image
            src="/option.png"
            alt="Logo"
            width={24}
            height={24}
            className={imageClassName}
          />
          <Image
            src="/client_logo.png"
            alt="client logo"
            width={24}
            height={24}
            className={clientLogoClassName}
          />
        </div>
      )}
    </motion.header>
  );
};

export default Header;
