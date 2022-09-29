export async function fetchMealsDetails(id) {
  const fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await fetchData.json();
  return data.meals;
}

export async function fetchDrinksDetails(id) {
  const fetchData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await fetchData.json();
  return drinks;
}

export async function drinkIngredientsAndMeasure(id, string) {
  const fetchData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await fetchData.json();

  const ingredients = [];

  if (drinks !== null) {
    const drinkEntries = Object.entries(drinks[0]);
    const filteredEntries = drinkEntries
      .filter((entrie) => entrie[0].includes(string));
    filteredEntries.forEach((filter) => ingredients.push(filter[1]));
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient !== null && ingredient !== '');
    return filteredIngredients;
  } return ingredients;
}

export async function mealIngredientsAndMeasure(id, string) {
  const fetchData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await fetchData.json();

  const ingredients = [];

  if (meals !== null) {
    const drinkEntries = Object.entries(meals[0]);
    const filteredEntries = drinkEntries
      .filter((entrie) => entrie[0].includes(string));
    filteredEntries.forEach((filter) => ingredients.push(filter[1]));
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient !== null && ingredient !== '');
    return filteredIngredients;
  } return ingredients;
}
