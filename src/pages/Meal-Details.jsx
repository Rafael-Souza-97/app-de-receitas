import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsDetails,
  mealIngredientsAndMeasure } from '../services/fetchs/fetchItemsDetails';
import RecipeDetails from '../components/RecipeDetails';

function MealDetails({ match: { path, params: { id } } }) {
  const [infoMeals, setInfoMeals] = useState([]);
  const [ingredientesMeal, setIngredientesMeal] = useState({
    ingredientes: [],
    measures: [],
  });

  useEffect(() => {
    const getMealInfo = async () => {
      const data = await fetchMealsDetails(id);
      setInfoMeals(data);
    };

    const ingredientesAndMeasure = async () => {
      const upDateIngredients = await mealIngredientsAndMeasure(id, 'strIngredient');
      const upDateMeasures = await mealIngredientsAndMeasure(id, 'strMeasure');
      setIngredientesMeal({
        ...ingredientesMeal,
        ingredientes: upDateIngredients,
        measures: upDateMeasures,
      });
    };

    ingredientesAndMeasure();
    getMealInfo();
  }, [id, ingredientesMeal]);

  return (
    <>
      <div>Meal-Details</div>
      <RecipeDetails
        id={ id }
        path={ path }
        dataMeal={ infoMeals }
        filteredIngredienteMeal={ ingredientesMeal.ingredientes }
        filteredMeasureMeal={ ingredientesMeal.measures }
      />
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
