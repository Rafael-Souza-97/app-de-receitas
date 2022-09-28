import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactContext from './RecipesContext';
import {
  fetchMeals12Cards,
  fetchDrinks12Cards,
  fetchMealsCategories,
  fetchDrinksCategories,
} from '../services/fetchs/fetch12Cards';

const NUMBER_ZERO = 0;
const NUMBER_TWELVE = 12;

function RecipesProvider({ children }) {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [renderMeals12Cards, setRenderMeals12Cards] = useState([]);
  const [renderDrinks12Cards, setRenderDrinks12Cards] = useState([]);
  const [renderMealsCategoriesButtons, setRenderMealsCategoriesButtons] = useState([]);
  const [renderDrinksCategoriesButtons, setRenderDrinksCategoriesButtons] = useState([]);
  const [renderMealsCategories12Cards, setRenderMealsCategories12Cards] = useState([]);
  const [renderDrinksCategories12Cards, setRenderDrinksCategories12Cards] = useState([]);
  const [selectedCategoryMeals, setSelectedCategoryMeals] = useState('');
  const [selectedCategoryDrinks, setSelectedCategoryDrinks] = useState('');
  const [isFilterButtonSelected, setIsFilterButtonSelected] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showRecipes, setShowRecipes] = useState([]);

  useEffect(() => {
    const mealsData = async () => {
      const cards = await fetchMeals12Cards();
      setRenderMeals12Cards(cards);
    };

    const drinksData = async () => {
      const cards = await fetchDrinks12Cards();
      setRenderDrinks12Cards(cards);
    };

    const mealsCategoriesData = async (param) => {
      const cards = await fetchMealsCategories(param);
      const sliceMealsCategories = cards.slice(NUMBER_ZERO, NUMBER_TWELVE);
      setRenderMealsCategories12Cards(sliceMealsCategories);
    };

    const drinksCategoriesData = async (param) => {
      const cards = await fetchDrinksCategories(param);
      const sliceDrinksCategories = cards.slice(NUMBER_ZERO, NUMBER_TWELVE);
      setRenderDrinksCategories12Cards(sliceDrinksCategories);
    };

    mealsData();
    drinksData();
    mealsCategoriesData(selectedCategoryMeals);
    drinksCategoriesData(selectedCategoryDrinks);
  }, [selectedCategoryMeals, selectedCategoryDrinks]);

  const contextValue = {
    userLogin,
    renderMeals12Cards,
    renderDrinks12Cards,
    renderMealsCategoriesButtons,
    renderDrinksCategoriesButtons,
    renderMealsCategories12Cards,
    renderDrinksCategories12Cards,
    selectedCategoryMeals,
    selectedCategoryDrinks,
    isFilterButtonSelected,
    inputValue,
    showRecipes,
    filterSearch,
    setUserLogin,
    setRenderMeals12Cards,
    setRenderDrinks12Cards,
    setRenderMealsCategoriesButtons,
    setRenderDrinksCategoriesButtons,
    setRenderMealsCategories12Cards,
    setRenderDrinksCategories12Cards,
    setSelectedCategoryMeals,
    setSelectedCategoryDrinks,
    setIsFilterButtonSelected,
    setInputValue,
    setShowRecipes,
    setFilterSearch,
  };

  return (
    <ReactContext.Provider value={ contextValue }>
      {children}
    </ReactContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
