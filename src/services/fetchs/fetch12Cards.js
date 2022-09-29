const NUMBER_ZERO = 0;
const NUMBER_TWELVE = 12;

export async function fetchMeals12Cards() {
  const fetchData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await fetchData.json();
  const twelveMeals = data.meals.slice(NUMBER_ZERO, NUMBER_TWELVE);

  return twelveMeals;
}

export async function fetchMealsCategories(mealName) {
  if (mealName === '') return [];
  const fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
  const data = await fetchData.json();

  return data.meals;
}

export async function fetchDrinks12Cards() {
  const fetchData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await fetchData.json();
  const twelveDrinks = data.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE);

  return twelveDrinks;
}

export async function fetchDrinksCategories(drinkName) {
  if (drinkName === '') return [];
  const fetchDrinksData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkName}`);
  const data = await fetchDrinksData.json();

  return data.drinks;
}
