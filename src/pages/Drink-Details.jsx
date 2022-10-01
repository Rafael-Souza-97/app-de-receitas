import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import Carousel from '../components/Carousel';
import { fetchDrinksDetails } from '../services/fetchs/fetchItemsDetails';
import { readLocalStorage,
  IN_PROGRESS_RECIPES,
  DONE_RECIPES } from '../services/localStorage';

function DrinkDetails({ match: { path, params: { id } } }) {
  const [infoDrinks, setInfoDrinks] = useState([]);
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState({
    ingredients: [],
    measures: [],
  });
  const [drinksInProgress, setDrinksInProgress] = useState(false);
  const [drinksDone, setDrinksDone] = useState(false);
  const history = useHistory();

  const { ingredients, measures } = ingredientAndMeasure;
  const mix = ingredients.map((e, i) => `${e} - ${measures[i]}`);

  useEffect(() => {
    const getDrinkInfo = async () => {
      const data = await fetchDrinksDetails(id);
      setInfoDrinks(data);

      if (data !== null && data !== undefined) {
        const arrayIngredients = [];
        const getEntries = Object.entries(data[0]);
        const filterEntries = getEntries
          .filter((entrie) => entrie[0].includes('strIngredient'));
        filterEntries.forEach((filter) => arrayIngredients.push(filter[1]));
        const ingredientsFiltered = arrayIngredients
          .filter((ingrediente) => ingrediente !== null && ingrediente !== '');
        setIngredientAndMeasure((prevTest) => ({
          ...prevTest,
          ingredients: ingredientsFiltered,
        }));
      }

      if (data !== null && data !== undefined) {
        const arrayMeasures = [];
        const getEntries = Object.entries(data[0]);
        const filterEntries = getEntries
          .filter((entrie) => entrie[0].includes('strMeasure'));
        filterEntries.forEach((filter) => arrayMeasures.push(filter[1]));
        const measuresFiltered = arrayMeasures
          .filter((ingrediente) => ingrediente !== null
          && ingrediente !== '' && ingrediente !== ' ');
        setIngredientAndMeasure((prevTest) => ({
          ...prevTest,
          measures: measuresFiltered,
        }));
      }

      const itemDone = readLocalStorage(DONE_RECIPES);
      if (itemDone !== null) {
        const isItemDone = itemDone.some(({ id: idDrink }) => idDrink === id);
        setDrinksDone(isItemDone);
      }

      const itemInProgress = readLocalStorage(IN_PROGRESS_RECIPES);
      if (itemInProgress !== null) {
        const getItemInProgress = Object.keys(itemInProgress.drinks);
        const verifyItemInProgress = getItemInProgress.some((item) => item === id);
        setDrinksInProgress(verifyItemInProgress);
      }
    };
    getDrinkInfo();
  }, [id]);

  const redirectToPageInProgress = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  return (
    <>
      <h1>Informações da Receita</h1>
      <RecipeDetails
        id={ id }
        path={ path }
        dataDrink={ infoDrinks }
        ingredientesAndMeasuresDrink={ mix }
        filteredIngredienteDrink={ ingredientAndMeasure.ingredients }
        filteredMeasureDrink={ ingredientAndMeasure.measures }
      />
      <Carousel path={ path } />
      {drinksDone === false && (
        <button
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ redirectToPageInProgress }
          data-testid="start-recipe-btn"
        >
          {drinksInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}

    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
