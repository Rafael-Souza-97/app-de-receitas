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
    if (recipes.drinks === null || recipes.meals === null) {
      console.log('ALERTA Q NAO TEM NADA');
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipes.drinks || recipes.meals) {
      if (pageTitle === 'Drinks' && recipes.drinks.length === 1) {
        history.push(`/drinks/${recipes.drinks[0].idDrink}`);
      }
      if (pageTitle === 'Meals' && recipes.meals.length === 1) {
        history.push(`/meals/${recipes.meals[0].idMeal}`);
      }
    }
  };

  const drinkClick = async () => {
    const firstLetter = ('First letter');
    let endpoint = '';
    let recipesDrinks = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
}
    if (inputValue.length === 1 && filterSearch === (firstLetter) && drinkValidate) {
      if (inputValue === '') return [];
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesDrinks = (await filterDrinkAPI(endpoint));
      redirectRecipes(recipesDrinks);
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Ingredient' && drinkValidate) {
      if (inputValue === '') return [];
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipesDrinks = (await filterDrinkAPI(endpoint));
      redirectRecipes(recipesDrinks);
      setRecipesDrinksSearch(recipesDrinks.drinks.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Name' && drinkValidate) {
      if (inputValue === '') return [];
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesDrinks = (await filterDrinkAPI(endpoint));
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
    const firstLetter = ('First letter');
    let endpoint = '';
    let recipesMeals = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)
    && mealsValidadte) {
      if (inputValue === '') return [];
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipesMeals = (await filterMealsAPI(endpoint));
      redirectRecipes(recipesMeals);
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Ingredient' && mealsValidadte) {
      if (inputValue === '') return [];
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipesMeals = (await filterMealsAPI(endpoint));
      redirectRecipes(recipesMeals);
      setRecipesMealsSearch(recipesMeals.meals.slice(NUMBER_ZERO, NUMBER_TWELVE));
      setShowRecipes(true);
    }
    if (filterSearch === 'Name' && mealsValidadte) {
      if (inputValue === '') return [];
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipesMeals = await filterMealsAPI(endpoint);
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
    }
    if (mealsValidadte) {
      mealsClick();
      setInputValue('');
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
