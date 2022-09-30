export const IN_PROGRESS_RECIPES = 'inProgressRecipes';
export const DONE_RECIPES = 'doneRecipes';

export const addMealsTokenLocalStorage = (token) => localStorage
  .setItem('mealsToken', token);

export const addDrinksTokenLocalStorage = (token) => localStorage
  .setItem('drinksToken', token);

export const addEmailLocalStorage = (userEmail) => localStorage
  .setItem('user', JSON.stringify({ email: userEmail }));

export const readLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
