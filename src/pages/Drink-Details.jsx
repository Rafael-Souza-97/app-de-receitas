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
  const [drinksInProgress, setDrinksInProgress] = useState(false);
  const [drinksDone, setDrinksDone] = useState(false);
  const [test, setTest] = useState({
    ingredientes1: [],
    measures1: [],
  });
  const history = useHistory();

  const { ingredientes1, measures1 } = test;
  const mix = ingredientes1.map((e, i) => `${e} - ${measures1[i]}`);

  useEffect(() => {
    const getDrinkInfo = async () => {
      const data = await fetchDrinksDetails(id);
      setInfoDrinks(data);
      if (data !== null && data !== undefined) {
        const xablau = [];
        const filterIngrediente = Object.entries(data[0]);
        const filtroEntries = filterIngrediente
          .filter((entrie) => entrie[0].includes('strIngredient'));
        filtroEntries
          .forEach((filter) => xablau.push(filter[1]));
        const ingrediantesFiltrados = xablau.filter((ingrediente) => ingrediente !== null && ingrediente !== '')
        setTest((prevTest) => ({
          ...prevTest,
          ingredientes1: ingrediantesFiltrados
        }))
      }

      if (data !== null && data !== undefined) {
        const xablau = [];
        const filterIngrediente = Object.entries(data[0]);
        const filtroEntries = filterIngrediente.filter((entrie) => entrie[0].includes('strMeasure'));
        filtroEntries.forEach((filter) => xablau.push(filter[1]));
        const ingrediantesFiltrados = xablau.filter((ingrediente) => ingrediente !== null && ingrediente !== '')
        setTest((prevTest) => ({
          ...prevTest,
          measures1: ingrediantesFiltrados
        }))
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
      <div>Drink-Details</div>
      <RecipeDetails
        id={ id }
        path={ path }
        dataDrink={ infoDrinks }
        ingredientesAndMeasuresDrink={ mix }
        filteredIngredienteDrink={ test.ingredientes1 }
        filteredMeasureDrink={ test.measures1 }
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
