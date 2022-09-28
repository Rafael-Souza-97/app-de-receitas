export async function filterMealsAPI(endpoint) {
  const respon = await fetch(endpoint);
  const data = await respon.json();
  return data;
}

export async function filterDrinkAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
