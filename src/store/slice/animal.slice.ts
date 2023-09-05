import { Animal } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimalProps {
  animal: Animal;
}

const initialState: AnimalProps = {
  animal: {} as Animal,
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    setAnimal: (state, action: PayloadAction<Animal>) => {
      state.animal = action.payload;
    },
    resetAnimal: (state) => {
      state.animal = {} as Animal;
    },
  },
});

export const { setAnimal, resetAnimal } = animalSlice.actions;

export default animalSlice.reducer;
