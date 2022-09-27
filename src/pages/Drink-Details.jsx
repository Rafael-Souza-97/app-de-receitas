import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinksDetails, drinkIngredientsAndMeasure,
} from '../services/fetchs/fetchItemsDetails';

import RecipeDetails from '../components/RecipeDetails';

function DrinkDetails({ match: { path, params: { id } } }) {
  const [infoDrinks, setInfoDrinks] = useState([]);
  const [ingredientesDrink, setIngredientesDrink] = useState({
    ingredientes: [],
    measures: [],
  });

  useEffect(() => {
    const getDrinkInfo = async () => {
      const data = await fetchDrinksDetails(id);
      setInfoDrinks(data);
    };

    const ingredientesAndMeasure = async () => {
      const upDateIngredients = await drinkIngredientsAndMeasure(id, 'strIngredient');
      const upDateMeasures = await drinkIngredientsAndMeasure(id, 'strMeasure');
      setIngredientesDrink({
        ...ingredientesDrink,
        ingredientes: upDateIngredients,
        measures: upDateMeasures,
      });
    };

    ingredientesAndMeasure();
    getDrinkInfo();
  }, [id, ingredientesDrink]);

  return (
    <>
      <div>Drink-Details</div>
      <RecipeDetails
        id={ id }
        path={ path }
        dataDrink={ infoDrinks }
        filteredIngredienteDrink={ ingredientesDrink.ingredientes }
        filteredMeasureDrink={ ingredientesDrink.measures }
      />
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
