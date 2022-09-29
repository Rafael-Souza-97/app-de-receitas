export const addMealsTokenLocalStorage = (token) => localStorage
  .setItem('mealsToken', token);

export const addDrinksTokenLocalStorage = (token) => localStorage
  .setItem('drinksToken', token);

export const addEmailLocalStorage = (userEmail) => localStorage
  .setItem('user', JSON.stringify({ email: userEmail }));

export const getEmailFromLocalStorage = (userEmail) => {
  if (localStorage.getItem(userEmail) === null) {
    return localStorage.setItem(userEmail, JSON.stringify({}));
  }
  return JSON.parse(localStorage.getItem(userEmail));
};
