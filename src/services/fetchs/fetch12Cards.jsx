const NUMBER_ZERO = 0;
const NUMBER_TWELVE = 12;

export async function fetchMeals12Cards() {
  const fetchData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await fetchData.json();
  const twelveMeals = data.meals.slice(NUMBER_ZERO, NUMBER_TWELVE);

  return twelveMeals;
}

export async function fetchDrinks12Cards() {
  const fetchData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await fetchData.json();
  const twelveDrinks = data.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE);

  return twelveDrinks;
}
