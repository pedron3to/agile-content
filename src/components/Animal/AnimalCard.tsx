import React, { useState, useEffect } from "react";
import { Animal } from "@/types";

interface AnimalProps {
  animal: Animal;
}

const AnimalCard = ({ animal }: AnimalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = animal.image;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [animal.image]);

  return (
    <div className="m-auto shadow-md p-4 w-full bg-white">
      <div
        className={`w-full h-40 bg-gray-300 ${
          imageLoaded ? "hidden" : "block"
        }`}
      ></div>
      {imageLoaded && (
        <img
          src={animal.image}
          alt="Animal Photo"
          className="object-contain w-full"
        />
      )}
      <div className="text-gray-500 text-sm">{animal.url}</div>
      <div className="text-black-600 text-lg font-semibold">
        <h2>{animal.title}</h2>
      </div>
      <p className="text-gray-600 text-md w-full">{animal.description}</p>
    </div>
  );
};

export default AnimalCard;
