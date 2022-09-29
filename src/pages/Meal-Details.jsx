import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import Carousel from '../components/Carousel';
import { fetchMealsDetails,
  mealIngredientsAndMeasure } from '../services/fetchs/fetchItemsDetails';
import { readLocalStorage,
  IN_PROGRESS_RECIPES,
  DONE_RECIPES } from '../services/localStorage';

function MealDetails({ match: { path, params: { id } } }) {
  const [infoMeals, setInfoMeals] = useState([]);
  // console.log(infoMeals);
  const [ingredientesMeal, setIngredientesMeal] = useState({
    ingredientes: [],
    measures: [],
  });
  const [mealsInProgress, setMealsInProgress] = useState(false);
  const [mealsDone, setMealsDone] = useState(false);
  const history = useHistory();
  const { ingredientes, measures } = ingredientesMeal;
  const mix = ingredientes.map((e, i) => `${e} - ${measures[i]}`);

  useEffect(() => {
    const getMealInfo = async () => {
      const data = await fetchMealsDetails(id);
      setInfoMeals(data);

      const itemDone = readLocalStorage(DONE_RECIPES);
      if (itemDone !== null) {
        const isItemDone = itemDone.some(({ id: idMeal }) => idMeal === id);
        setMealsDone(isItemDone);
      }

      const itemInProgress = readLocalStorage(IN_PROGRESS_RECIPES);
      if (itemInProgress !== null) {
        const getItemInProgress = Object.keys(itemInProgress.meals);
        const verifyItemInProgress = getItemInProgress.some((item) => item === id);
        setMealsInProgress(verifyItemInProgress);
      }
    };

    const ingredientesAndMeasure = async () => {
      const upDateIngredients = await mealIngredientsAndMeasure(id, 'strIngredient');
      const upDateMeasures = await mealIngredientsAndMeasure(id, 'strMeasure');
      setIngredientesMeal((prevIngredientes) => ({
        ...prevIngredientes,
        ingredientes: upDateIngredients,
        measures: upDateMeasures,
      }));
    };
    ingredientesAndMeasure();
    getMealInfo();
    // feEmDeus();
  }, [id]);

  const redirectToPageInProgress = () => {
    history.push(`/meals/${id}/in-progress`);
  };
  return (
    <>
      <div>Meal-Details</div>
      <RecipeDetails
        id={ id }
        path={ path }
        dataMeal={ infoMeals }
        ingredientesAndMeasuresMeal={ mix }
        filteredIngredienteMeal={ ingredientesMeal.ingredientes }
        filteredMeasureMeal={ ingredientesMeal.measures }
      />
      <Carousel path={ path } />
      {mealsDone === false && (
        <button
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ redirectToPageInProgress }
          data-testid="start-recipe-btn"
        >
          {mealsInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </>
  );
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MealDetails;
