import React, { useState, useEffect } from 'react';
import { fetchMeals12Cards } from '../services/fetchs/fetch12Cards';

const SIX = 6;

function RecipesMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMeals12Cards();
      const dataSlice = data.slice(0, SIX);
      setMeals(dataSlice);
    };
    fetch();
  }, []);

  const mapSixMeals = () => {
    const items = meals.map((drink, index) => (
      <div
        className="carousel-img-container"
        key={ index }
        data-testid={ `${index}-recommendation-card` }
      >
        <img
          className="carousel-img"
          src={ drink.strMealThumb }
          alt={ drink.strMeal }

        />
        <div>
          <h5 data-testid={ `${index}-recommendation-title` }>{drink.strMeal}</h5>
        </div>
      </div>
    ));
    return items;
  };
  return (
    mapSixMeals()
  );
}

export default RecipesMeals;
