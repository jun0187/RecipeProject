import { RecipeListModel } from "./reducer/recipe.reducer";

export const recipeListing: RecipeListModel[] = [
  {
    recipeTypeName: 'Salad',
    imageURI:
      'https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg',
    ingredients: 'Contain sugar, cabbage',
    step: 'Step 1: Shake, Step 2: Take out',
  },
  {
    recipeTypeName: 'Salad',
    imageURI:
      'https://cdn.loveandlemons.com/wp-content/uploads/2021/11/beet-salad-1.jpg',
    ingredients: 'Contain salad, cucumber',
    step: 'Step 1: Pour out, Step 2: Study the instruction',
  },
  {
    recipeTypeName: 'Mexican',
    imageURI:
      'https://images.immediate.co.uk/production/volatile/sites/30/2022/10/Pork-carnitas-b94893e.jpg?quality=90&resize=556,505',
    ingredients: 'Contain mexican, carrot',
    step: 'Step 1: Understand the mexican culture',
  },
  {
    recipeTypeName: 'Chinese',
    imageURI:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6M2YoY8j-Ru-YiRGwI4tcpjHuLUcsda6_AyJqXF6saw&s',
    ingredients: 'Contain chinese sausage',
    step: 'Step 1: Sleep, Step 2: Eat',
  },
];
