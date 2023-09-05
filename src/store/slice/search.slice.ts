import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Search {
  value: string;
  isLoading: boolean;
}

const initialState: Search = {
  value: "",
  isLoading: true,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setValue, setIsloading } = searchSlice.actions;

export default searchSlice.reducer;
