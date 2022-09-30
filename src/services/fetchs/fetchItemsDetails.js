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
