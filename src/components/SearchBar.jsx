// import PropTypes, { objectOf, shape } from 'prop-types';
import { string } from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { filterMealsAPI, filterDrinkAPI } from '../services/fetchs/filteredAPI';

const NUMBER_ZERO = 0;
const NUMBER_TWELVE = 12;
function SearchBar({ pageTitle }) {
  const history = useHistory();
  const {
    inputValue,
    filterSearch,
    setFilterSearch,
    setShowRecipes,
    setInputValue,
    setRecipesDrinksSearch,
    setRecipesMealsSearch,
  } = useContext(RecipesContext);

  const drinkValidate = pageTitle === 'Drinks';
  const mealsValidadte = pageTitle === 'Meals';

  const handleChange = ({ target }) => (
    target.name === 'inputsearch'
      ? setInputValue(target.value)
      : setFilterSearch(target.value)
  );

  const redirectRecipes = (recipes) => {
    if (recipes === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipes) {
      if (pageTitle === 'Drinks' && recipes.length === 1) {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
      if (pageTitle === 'Meals' && recipes.length === 1) {
        history.push(`/meals/${recipes[0].idMeal}`);
      }
    }
  };

  const feEmDeus = async (endPoint) => {
    const recipesDrinks = await filterDrinkAPI(endPoint);
    redirectRecipes(recipesDrinks);
    if (recipesDrinks !== null) {
      setRecipesDrinksSearch(recipesDrinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
  };

  const drinkClick = async () => {
    const firstLetter = 'First letter';
    let endPoint = '';

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      feEmDeus(endPoint);
    }
    if (filterSearch === 'Ingredient' && drinkValidate) {
      console.log(inputValue, 'inputValue');
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      feEmDeus(endPoint);
    }
    if (filterSearch === 'Name') {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      feEmDeus(endPoint);
    }
  };

  const feEmJesus = async (endPoint) => {
    const recipesMeals = await filterMealsAPI(endPoint);
    redirectRecipes(recipesMeals);
    if (recipesMeals !== null) {
      setRecipesMealsSearch(recipesMeals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
  };

  const mealsClick = async () => {
    const firstLetter = 'First letter';
    let endPoint = '';

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
    }

    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      if (inputValue === '') { return null; }
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      feEmJesus(endPoint);
    }
    if (filterSearch === 'Ingredient') {
      if (inputValue === '') { return null; }
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      feEmJesus(endPoint);
    }
    if (filterSearch === 'Name') {
      if (inputValue === '') { return null; }
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      feEmJesus(endPoint);
    }
  };

  const handleClick = () => {
    if (drinkValidate) {
      drinkClick();
      setInputValue('');
      setShowRecipes(false);
    }
    if (mealsValidadte) {
      mealsClick();
      setInputValue('');
      setShowRecipes(false);
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        value={ inputValue }
        name="inputsearch"
        onChange={ handleChange }
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="Ingredient"
        name="radio"
        onChange={ handleChange }
      />
      Ingrediente
      <input
        type="radio"
        data-testid="name-search-radio"
        value="Name"
        name="radio"
        onChange={ handleChange }
      />
      Nome da receita
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="First letter"
        name="radio"
        onChange={ handleChange }
      />
      Começa com ...
      <button
        type="button"
        data-testid="exec-search-btn"
        value="Search"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  pageTitle: string.isRequired,
};

export default SearchBar;
