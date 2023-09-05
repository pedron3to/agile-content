import { setAnimal } from "@/store/slice/animal.slice";
import { Animal } from "@/types";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

interface AnimalListItemProps {
  animal: Animal;
}

const AnimalListItem = memo(({ animal }: AnimalListItemProps) => {
  const dispatch = useDispatch();

  const titleClassName =
    "cursor-pointer text-blue-500 text-lg font-semibold hover:underline hover:animate-underline";

  const handleOpenAnimalCard = useCallback(() => {
    dispatch(setAnimal(animal));
  }, [animal, dispatch]);

  return (
    <div className="mt-6" onClick={handleOpenAnimalCard}>
      <p className="text-gray-500 text-sm">{animal.url}</p>
      <div className={titleClassName}>{animal.title}</div>
      <p className="text-gray-600 text-md">{animal.description}</p>
    </div>
  );
});

AnimalListItem.displayName = "AnimalListItem";

export default AnimalListItem;
