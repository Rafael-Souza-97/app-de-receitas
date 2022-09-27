async function filteredAPI(endpoint) {
  const respon = await fetch(endpoint);
  const data = await respon.json();
  return data;
}
export default filteredAPI;
