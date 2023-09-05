"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import Layout from "@/components/Layout/Layout";
import SearchInput from "@/components/Input/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import useDeviceType from "@/hooks/useDeviceType";
import { setValue } from "@/store/slice/search.slice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useDeviceType();

  const [isSelected, setIsSelected] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setValue(debouncedValue));
  }, [debouncedValue, dispatch]);

  const buttonClassName = [
    "bg-gray-300 rounded-sm p-2 hover:bg-gray-400 hover:text-gray-100 text-gray-500",
    isSelected ? "mt-6 scale-120" : "mt-4",
  ].join(" ");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleOnEnter = useCallback(() => {
    router.push("/search");
  }, [router]);

  useEffect(() => {
    if (!isSelected && typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [isSelected]);

  return (
    <Layout isSelected={isSelected} isHomePage={true}>
      <motion.div
        className="flex flex-col items-center justify-center flex-grow mt-40 md:mt-60"
        whileFocus={{ scale: 1.2 }}
      >
        <Image
          src="/google_logo.svg"
          alt="Logo"
          className={isSelected ? "scale-120 mb-6" : ""}
          width={isMobile ? 200 : 272}
          height={isMobile ? 67 : 92}
        />
        <div className="w-3/4 md:w-2/4">
          <SearchInput
            setIsSelected={setIsSelected}
            isSelected={isSelected}
            onChange={handleInputChange}
            value={searchValue}
            onEnter={handleOnEnter}
          />
        </div>

        <Link href={"/search"}>
          <motion.button id="search-button" className={buttonClassName}>
            Buscar
          </motion.button>
        </Link>
      </motion.div>
    </Layout>
  );
};

export default Home;
