export async function filterMealsAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function filterDrinkAPI(endpoint) {
  if (endpoint === '' || endpoint === null) {
    return [];
  }
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data, 'API');
  return data;
}
