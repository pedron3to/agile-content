import dynamic from "next/dynamic";

const AnimalCard = dynamic(() => import("./AnimalCard"));
const skeletonAnimalListItem = dynamic(
  () => import("./skeletonAnimalListItem")
);
const AnimalListItem = dynamic(() => import("./AnimalListItem"));

export { AnimalCard, skeletonAnimalListItem, AnimalListItem };
