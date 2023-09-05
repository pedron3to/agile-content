import { AnimalModule, faker } from "@faker-js/faker";

const getType = () => faker.animal.type();
const getUrl = () => faker.internet.url();
const getText = () => faker.lorem.sentences();
//@ts-ignore
const getTitle = (type: AnimalModule) => faker.animal[type]();
const getImage = () =>
  faker.image.urlLoremFlickr({
    category: "animal",
    height: 362,
    width: 644,
  });

const type = getType();

export const getAnimalData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const animalData = [...new Array(1000)].map((item, index) => ({
      type,
      id: index + 1,
      url: getUrl(),
      //@ts-ignore
      title: getTitle(type),
      description: getText(),
      image: getImage(),
    }));
    resolve(animalData);
  });
};
