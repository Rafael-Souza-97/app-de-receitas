import React, { useContext } from 'react';

import RecipesContext from '../context/RecipesContext';
import { filterMealsAPI, filterDrinkAPI } from '../services/fetchs/filteredAPI';

function SearchBar() {
  const {
    inputValue,
    filterSearch,
    setFilterSearch,
    setShowRecipes,
  } = useContext(RecipesContext);

  const handleChange = ({ target }) => {
    setFilterSearch(target.value);
  };

  // Testar um switch case ou um if Else para rodar o filtro certo
  const handleClick = async () => {
    const firstLetter = ('First letter');
    let endpoint = '';
    let recipes = [];

    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipes = await filterMealsAPI(endpoint).meals;
    }
    if (filterSearch === 'Ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipes = await filterMealsAPI(endpoint).meals;
    }
    if (filterSearch === 'Name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipes = await filterMealsAPI(endpoint).meals;
    }
    if (inputValue.length > 1 && filterSearch === (firstLetter)) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (inputValue.length === 1 && filterSearch === (firstLetter)) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
      recipes = await filterDrinkAPI(endpoint).drinks;
    }
    if (filterSearch === 'Ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
      recipes = await filterDrinkAPI(endpoint).drinks;
    }
    if (filterSearch === 'Name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
      recipes = await filterDrinkAPI(endpoint).drinks;
    }
    setShowRecipes(recipes);
  };

  return (
    <div>
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

export default SearchBar;
