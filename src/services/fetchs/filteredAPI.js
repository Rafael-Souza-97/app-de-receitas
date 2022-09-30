export async function filterMealsAPI(endpoint) {
  try {
    if (endpoint === '' || endpoint === null) {
      return [];
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.meals;
  } catch {
    console.error();
    return null;
  }
}

export async function filterDrinkAPI(endpoint) {
  try {
    if (endpoint === '' || endpoint === null) {
      return [];
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.drinks;
  } catch {
    return null;
  }
}
