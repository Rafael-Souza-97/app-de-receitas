export const favoriteMealCreator = (dataMeal) => {
  const newFavoriteMeal = {
    id: dataMeal.idMeal,
    type: 'meal',
    nationality: dataMeal.strArea,
    category: dataMeal.strCategory,
    alcoholicOrNot: '',
    name: dataMeal.strMeal,
    image: dataMeal.strMealThumb,
  };
  return newFavoriteMeal;
};

export const favoriteDrinkCreator = (dataDrink) => {
  const newFavoriteDrink = {
    id: dataDrink.idDrink,
    type: 'drink',
    nationality: '',
    category: dataDrink.strCategory,
    alcoholicOrNot: dataDrink.strAlcoholic,
    name: dataDrink.strDrink,
    image: dataDrink.strDrinkThumb,
  };
  return newFavoriteDrink;
};
