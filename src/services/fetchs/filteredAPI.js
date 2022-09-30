export async function filterMealsAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function filterDrinkAPI(endpoint) {
  const resp = await fetch(endpoint);
  const data = await resp.json();
  console.log(data, 'API');
  return data;
}
