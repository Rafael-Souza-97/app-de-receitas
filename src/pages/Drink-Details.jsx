import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import Carousel from '../components/Carousel';
import { fetchDrinksDetails, drinkIngredientsAndMeasure,
} from '../services/fetchs/fetchItemsDetails';
import { readLocalStorage,
  IN_PROGRESS_RECIPES,
  DONE_RECIPES } from '../services/localStorage';

function DrinkDetails({ match: { path, params: { id } } }) {
  const [infoDrinks, setInfoDrinks] = useState([]);
  const [ingredientesDrink, setIngredientesDrink] = useState({
    ingredientes: [],
    measures: [],
  });
  const [drinksInProgress, setDrinksInProgress] = useState(false);
  const [drinksDone, setDrinksDone] = useState(false);
  const history = useHistory();

  const { ingredientes, measures } = ingredientesDrink;
  const mix = ingredientes.map((e, i) => `${e} - ${measures[i]}`);
  console.log(infoDrinks);

  useEffect(() => {
    const getDrinkInfo = async () => {
      const data = await fetchDrinksDetails(id);
      setInfoDrinks(data);

      const itemDone = readLocalStorage(DONE_RECIPES);
      if (itemDone !== null) {
        const isItemDone = itemDone.some(({ id: idDrink }) => idDrink === id);
        console.log(isItemDone);
        setDrinksDone(isItemDone);
      }

      const itemInProgress = readLocalStorage(IN_PROGRESS_RECIPES);
      console.log(itemInProgress);
      if (itemInProgress !== null) {
        const getItemInProgress = Object.keys(itemInProgress.drinks);
        const verifyItemInProgress = getItemInProgress.some((item) => item === id);
        setDrinksInProgress(verifyItemInProgress);
      }
    };

    const ingredientesAndMeasure = async () => {
      const upDateIngredients = await drinkIngredientsAndMeasure(id, 'strIngredient');
      const upDateMeasures = await drinkIngredientsAndMeasure(id, 'strMeasure');
      setIngredientesDrink((prevIngredientes) => ({
        ...prevIngredientes,
        ingredientes: upDateIngredients,
        measures: upDateMeasures,
      }));
    };
    // filterItems();
    console.log('oi');
    ingredientesAndMeasure();
    getDrinkInfo();
    // feEmJesus();
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
        filteredIngredienteDrink={ ingredientesDrink.ingredientes }
        filteredMeasureDrink={ ingredientesDrink.measures }
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
