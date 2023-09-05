"use client";
import { resetAnimal } from "@/store/slice/animal.slice";
import { Animal } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import useToast from "./useToast";
import { getAnimalData } from "@/service/data";
import { setIsloading } from "@/store/slice/search.slice";

export const useSearchPage = () => {
  const [filteredData, setFilteredData] = useState<any>([]);
  const [animalData, setAnimalData] = useState<Animal[]>([]);

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const search = useSelector((state: RootState) => state.searchReducer.value);
  const animal = useSelector((state: RootState) => state.animalReducer.animal);
  const isLoading = useSelector(
    (state: RootState) => state.searchReducer.isLoading
  );

  const handleCloseAnimalCard = useCallback(() => {
    dispatch(resetAnimal());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnimalData();
        setAnimalData(data);
      } catch (error) {
        showToast("Something went wrong, please try again later");
      }
    };

    fetchData();
  }, [showToast]);

  useEffect(() => {
    dispatch(setIsloading(true));

    const lowercaseQuery = search?.toLowerCase() || "";
    const filteredData = animalData.filter((item: Animal) => {
      const isTitleMatch = item.title.toLowerCase().includes(lowercaseQuery);
      const isTypeMatch = item.type.toLowerCase().includes(lowercaseQuery);
      return isTitleMatch || isTypeMatch;
    });

    const timeoutId = setTimeout(() => {
      if (!search) {
        dispatch(setIsloading(false));
      } else {
        setFilteredData(filteredData);
        dispatch(setIsloading(false));
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [search, dispatch, animalData]);

  return {
    isLoading,
    filteredData,
    search,
    animal,
    handleCloseAnimalCard,
  };
};
