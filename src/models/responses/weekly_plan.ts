export interface WeeklyPlanList {
  id: string;
  beginDate: Date;
  endDate: Date;
  urlImage: string;
  title: string;
  description: string;
  createAt: Date;
  createdBy: string;
  approvedAt: null;
  approvedBy: null;
  updatedAt: null;
  updatedBy: string;
  processStatus: string;
  recipePLans: RecipePLAN[];
}

export interface RecipePLAN {
  id: string;
  recipeId: string;
  standardWeeklyPlanId: string;
  dayInWeek: number;
  mealInDay: number;
  quantity: number;
  price: number;
  recipe: Recipe;
}

interface Recipe {
  id: string;
  name: string;
  servingSize: number;
  cookingTime: number;
  difficulty: number;
  description: string;
  notice: null | string;
  img: string;
  price: number;
  popularity: number;
  processStatus: string;
  baseStatus: number;
  createdAt: Date;
  createdBy: string;
  approvedAt: Date | null;
  approvedBy: string;
  updatedAt: Date;
  updatedBy: string;
  recipeIngredients: RecipeIngredient[];
  recipeCategories: RecipeCategory[];
  recipeNutrient: Nutrient | null;
  recipeSteps: RecipeStep[];
}

interface RecipeCategory {
  id: string;
  categoryId: string;
  recipeId: string;
  category: Category;
}

interface Category {
  id: string;
  type?: string;
  name: string;
  description: string;
  status: string;
}

interface RecipeIngredient {
  id: string;
  recipeId: string;
  ingredientId: string;
  amount: number;
  ingredient: Ingredient;
}

interface Ingredient {
  id: string;
  ingredientCategoryId: string;
  name: string;
  img: string;
  unit: string;
  price: number;
  packagingMethod: string;
  preservationMethod: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  ingredientNutrient: Nutrient;
  ingredientCategory: Category;
}

interface Nutrient {
  id: string;
  ingredientID?: string;
  calories: number;
  fat: number;
  saturatedFat: number;
  sugar: number;
  carbonhydrate: number;
  dietaryFiber: number;
  protein: number;
  sodium: number;
  recipeID?: string;
}

interface RecipeStep {
  id: string;
  recipeId: string;
  index: number;
  name: string;
  mediaURL: string;
  imageLink: string;
  description: string;
}
