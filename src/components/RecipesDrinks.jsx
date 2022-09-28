import React, { useState, useEffect } from 'react';
import { fetchDrinks12Cards } from '../services/fetchs/fetch12Cards';

const SIX = 6;

function RecipesDrinks() {
  const [drinks, setDrink] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchDrinks12Cards();
      const dataSlice = data.slice(0, SIX);
      setDrink(dataSlice);
    };
    fetch();
  }, []);

  const mapSixDrinks = () => {
    const items = drinks.map((drink, index) => (
      <div
        className="carousel-img-container"
        key={ index }
        data-testid={ `${index}-recommendation-card` }
      >
        <img
          className="carousel-img"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }

        />
        <div>
          <h5 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h5>
        </div>
      </div>
    ));
    return items;
  };
  return (
    mapSixDrinks()
  );
}

export default RecipesDrinks;
