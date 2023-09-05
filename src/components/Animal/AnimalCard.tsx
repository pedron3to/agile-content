import { Animal } from "@/types";

interface AnimalProps {
  animal: Animal;
}

const AnimalCard = ({ animal }: AnimalProps) => (
  <div className="m-auto shadow-md p-4 w-full bg-white">
    <img
      src={animal.image}
      alt="Animal Photo"
      className="object-contain w-full"
    />
    <div className="text-gray-500 text-sm ">{animal.url}</div>
    <div className="text-black-600 text-lg font-semibold">
      <h2>{animal.title}</h2>
    </div>
    <p className="text-gray-600 text-md w-full">{animal.description}</p>
  </div>
);

export default AnimalCard;
