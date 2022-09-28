const NUMBER_ZERO = 0;
const NUMBER_FIVE = 5;

export async function mealsCategories() {
  const fetchData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await fetchData.json();
  const fiveMealsCategories = data.meals.slice(NUMBER_ZERO, NUMBER_FIVE);

  return fiveMealsCategories;
}

export async function drinksCategories() {
  const fetchData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await fetchData.json();
  const fiveDrinksCategories = data.drinks.slice(NUMBER_ZERO, NUMBER_FIVE);

  return fiveDrinksCategories;
}
