export interface Recipe {
  title: string;
  ingredients: string[];
  link: string;
  gif: string;
}

export interface SearchedRecipes {
  keywords: string[],
  recipes: Recipe[],
}
