import React from 'react';
import PropTypes from 'prop-types';
import RecipesDrinks from './RecipesDrinks';
import RecipesMeals from './RecipesMeals';
import '../styles/Details.css';

function Carousel({ path }) {
  return (

    <div className="carousel">
      {path.includes('meals') ? <RecipesDrinks /> : <RecipesMeals />}
    </div>

  );
}

Carousel.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Carousel;
