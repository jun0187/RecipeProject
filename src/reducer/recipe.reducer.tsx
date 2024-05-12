import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface RecipeModel {
  id: number;
  recipeTypeName: string;
  imageURI: string;
  ingredients: string;
  step: string;
  recipeName: string;
}

export interface RecipeTypeModel {
  recipeTypeName: string;
}

export interface CounterState {
  recipeTypeList: Array<RecipeTypeModel>;
  recipeList: Array<RecipeModel>;
  recipeDetail: RecipeModel | null;
  recipeCounter: number;
}

const initialState: CounterState = {
  recipeTypeList: [],
  recipeList: [],
  recipeDetail: null,
  recipeCounter:4,
};

export const recipeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setRecipeTypeList: (
      state,
      action: PayloadAction<Array<RecipeTypeModel>>,
    ) => {
      state.recipeTypeList = action.payload;
    },
    setRecipeList: (state, action: PayloadAction<Array<RecipeModel>>) => {
      state.recipeList = action.payload;
    },
    setRecipeDetail: (state, action: PayloadAction<RecipeModel | null>) => {
      state.recipeDetail = action.payload;
    },
    setRecipeCounter: (state, action: PayloadAction<number>) => {
      state.recipeCounter = action.payload;
    },
  },
});

export const {setRecipeTypeList, setRecipeList, setRecipeDetail, setRecipeCounter} =
  recipeSlice.actions;

export default recipeSlice.reducer;
