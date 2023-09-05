"use client";
import { Animal } from "@/types";
import { AnimalCard, AnimalListItem } from "@/components/Animal";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal";
import SkeletonAnimalListItem from "@/components/Animal/skeletonAnimalListItem";
import { useSearchPage } from "@/hooks/useSearchPage";
import useDeviceType from "@/hooks/useDeviceType";

const Page = () => {
  const { isLoading, filteredData, search, animal, handleCloseAnimalCard } =
    useSearchPage();

  const { isTablet, isMobile } = useDeviceType();

  const resultClassName = "w-full lg:w-2/3 rounded-md md:px-8 lg:px-24";
  const textClassName = "text-gray-500 text-md";

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className={resultClassName}>
          {Array.from({ length: 6 }, (_, index) => (
            <SkeletonAnimalListItem key={index} />
          ))}
        </div>
      );
    }

    if (filteredData.length === 0 && search) {
      return (
        <div>
          <div className={`${resultClassName} mt-4 px-4 ${textClassName}`}>
            No Results for{" "}
            <span>
              &apos;<strong>{search}</strong>&apos;.
            </span>
          </div>
          <div className={`${resultClassName} mt-2 px-4 ${textClassName}`}>
            Trying looking for:{" "}
            <span>
              &apos;
              <strong>
                insect, fish, horse, crocodile, bear, cetacean, cow, lion,
                rabbit, cat, snake, dog, bird
              </strong>
              &apos;.
            </span>
          </div>
        </div>
      );
    }

    if (!search) {
      return (
        <div className={`${resultClassName} mt-4 px-4 ${textClassName}`}>
          Trying looking for:{" "}
          <span>
            &apos;
            <strong>
              insect, fish, horse, crocodile, bear, cetacean, cow, lion, rabbit,
              cat, snake, dog, bird
            </strong>
            &apos;.
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-row items-star">
        <div className={`${resultClassName} px-4 md:px-16 lg:px-24`}>
          {filteredData.map((animal: Animal) => (
            <AnimalListItem key={animal.id} animal={animal} />
          ))}
        </div>

        <>
          {animal.hasOwnProperty("title") && (
            <>
              {isTablet || isMobile ? (
                <div>
                  <Modal
                    isOpen={isTablet || isMobile}
                    onClose={handleCloseAnimalCard}
                  >
                    <AnimalCard animal={animal} />
                  </Modal>
                </div>
              ) : (
                <div className="lg:w-1/3 mt-4 mr-16">
                  <AnimalCard animal={animal} />
                </div>
              )}
            </>
          )}
        </>
      </div>
    );
  };

  return <Layout isHomePage={false}>{renderResults()}</Layout>;
};

export default Page;
