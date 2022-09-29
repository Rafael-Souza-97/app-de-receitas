import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import Carousel from '../components/Carousel';
import { fetchMealsDetails } from '../services/fetchs/fetchItemsDetails';
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
  const [test, setTest] = useState({
    ingredientes1: [],
    measures1: [],
  });
  const [mealsInProgress, setMealsInProgress] = useState(false);
  const [mealsDone, setMealsDone] = useState(false);
  const history = useHistory();
  const { ingredientes1, measures1 } = test;
  const mix = ingredientes1.map((e, i) => `${e} - ${measures1[i]}`);

  useEffect(() => {
    const getMealInfo = async () => {
      const data = await fetchMealsDetails(id);
      setInfoMeals(data);

      if (data !== null && data !== undefined) {
        const xablau = [];
        const filterIngrediente = Object.entries(data[0]);
        const filtroEntries = filterIngrediente.filter((entrie) => entrie[0].includes('strIngredient'));
        filtroEntries.forEach((filter) => xablau.push(filter[1]));
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
        const ingrediantesFiltrados = xablau.filter((ingrediente) => ingrediente !== null && ingrediente !== '' && ingrediente !== " ")
        setTest((prevTest) => ({
          ...prevTest,
          measures1: ingrediantesFiltrados
        }))
      }


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
    getMealInfo();
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
        filteredIngredienteMeal={ test.ingredientes1 }
        filteredMeasureMeal={ test.measures1 }
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
