import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface RecipeListModel {
  recipeTypeName: string;
  imageURI: string;
  ingredients: string;
  step: string;
}

export interface RecipeTypeListModel {
  recipeTypeName: string;
}

export interface CounterState {
  recipeTypeList: Array<RecipeTypeListModel>;
  recipeList: Array<RecipeListModel>;
}

const initialState: CounterState = {
  recipeTypeList: [],
  recipeList: [],
};

export const recipeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setRecipeTypeList: (
      state,
      action: PayloadAction<Array<RecipeTypeListModel>>,
    ) => {
      state.recipeTypeList = action.payload;
    },
    setRecipeList: (state, action: PayloadAction<Array<RecipeListModel>>) => {
      state.recipeList = action.payload;
    },
  },
});

export const {setRecipeTypeList, setRecipeList} = recipeSlice.actions;

export default recipeSlice.reducer;
