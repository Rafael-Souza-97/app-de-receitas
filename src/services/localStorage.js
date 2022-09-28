export const addMealsTokenLocalStorage = (token) => localStorage
  .setItem('mealsToken', token);

export const addDrinksTokenLocalStorage = (token) => localStorage
  .setItem('drinksToken', token);

export const addEmailLocalStorage = (userEmail) => localStorage
  .setItem('user', JSON.stringify({ email: userEmail }));

export const getEmailFromLocalStorage = (userEmail) => (
  JSON.parse(localStorage.getItem(userEmail))
);
