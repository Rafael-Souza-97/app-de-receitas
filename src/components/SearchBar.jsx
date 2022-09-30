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
    console.log(recipes);
    // if (recipes.drinks === null || recipes.meals === null) {
    if (!recipes) {
      console.log('ALERTA Q NAO TEM NADA');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipes) {
      if (pageTitle === 'Drinks' && recipes.drinks.length === 1) {
        history.push(`/drinks/${recipes.drinks[0].idDrink}`);
      }
      if (pageTitle === 'Meals' && recipes.meals.length === 1) {
        history.push(`/meals/${recipes.meals[0].idMeal}`);
      }
    }
  };

  const drinkClick = async () => {
    const firstLetter = 'First letter';
    let endPoint = '';
    let recipesDrinks = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
      // console.log('ALERTA DE LETRA D');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      if (inputValue === '') return null;
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesDrinks = await filterDrinkAPI(endPoint);
      redirectRecipes(recipesDrinks);
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Ingredient' && drinkValidate) {
      console.log(inputValue, 'inputValue');
      if (inputValue === '') return null;

      // www.thecocktaildb.com/api/json/v1/1/search.php?i=
      // www.thecocktaildb.com/api/json/v1/1/filter.php?i
      // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
      // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      console.log(endPoint, 'endPoint');
      recipesDrinks = await filterDrinkAPI(endPoint);
      console.log(recipesDrinks, 'recipesDrinks');
      redirectRecipes(recipesDrinks);
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Name') {
      if (inputValue === '') return null;
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesDrinks = await filterDrinkAPI(endPoint);
      redirectRecipes(recipesDrinks);
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (pageTitle === 'Drinks' && recipesDrinks.drinks.length > 1) {
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
  };

  const mealsClick = async () => {
    const firstLetter = 'First letter';
    let endPoint = '';
    let recipesMeals = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
      // console.log('ALERTA DE LETRA M');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      if (inputValue === '') return [];
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesMeals = await filterMealsAPI(endPoint);
      redirectRecipes(recipesMeals);
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Ingredient') {
      if (inputValue === '') return [];
      endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipesMeals = await filterMealsAPI(endPoint);
      redirectRecipes(recipesMeals);
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Name') {
      if (inputValue === '') return [];
      endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesMeals = await filterMealsAPI(endPoint);
      redirectRecipes(recipesMeals);
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (pageTitle === 'Meals' && recipesMeals.meals.length > 1) {
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
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
