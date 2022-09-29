// import PropTypes, { objectOf, shape } from 'prop-types';
import { string } from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { filterMealsAPI, filterDrinkAPI } from '../services/fetchs/filteredAPI';

function SearchBar({ pageTitle }) {
  console.log(pageTitle);
  const history = useHistory();
  const {
    inputValue,
    filterSearch,
    setFilterSearch,
    setShowRecipes,
    setInputValue,
  } = useContext(RecipesContext);

  const drinkValidate = pageTitle === 'Drinks';
  const mealsValidadte = pageTitle === 'Meals';

  const handleChange = ({ target }) => (
    target.name === 'inputsearch'
      ? setInputValue(target.value)
      : setFilterSearch(target.value)
  );

  const redirectRecipes = (recipes) => {
    console.log(recipes, 'ESSEAQUI');
    if (!recipes.drinks || !recipes.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipes.drinks || recipes.meals) {
      if (pageTitle === 'Drinks' && recipes.drinks.length === 1) {
        console.log('ENTROU');
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
    let recipes = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)
    && drinkValidate) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipes = (await filterDrinkAPI(endpoint));
      redirectRecipes(recipes);
      console.log('if 4', recipes);
    }
    if (filterSearch === 'Ingredient' && drinkValidate) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipes = (await filterDrinkAPI(endpoint));
      redirectRecipes(recipes);
      console.log('if 5', recipes);
    }
    if (filterSearch === 'Name' && drinkValidate) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipes = (await filterDrinkAPI(endpoint));
      redirectRecipes(recipes);
      console.log('if 6', recipes);
    }
    await setShowRecipes(recipes);
  };

  const mealsClick = async () => {
    const firstLetter = ('First letter');
    let endpoint = '';
    let recipes = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)
    && mealsValidadte) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipes = (await filterMealsAPI(endpoint));
      redirectRecipes(recipes);
      console.log('if 1', recipes);
    }
    if (filterSearch === 'Ingredient' && mealsValidadte) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipes = (await filterMealsAPI(endpoint));
      redirectRecipes(recipes);
      console.log('if 2', recipes);
    }
    if (filterSearch === 'Name' && mealsValidadte) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipes = await filterMealsAPI(endpoint);
      redirectRecipes(recipes);
      console.log('if 3', recipes);
    }

    await setShowRecipes(recipes);
  };

  const handleClick = async () => {
    if (drinkValidate) {
      await drinkClick();
    }
    if (mealsValidadte) {
      await mealsClick();
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
