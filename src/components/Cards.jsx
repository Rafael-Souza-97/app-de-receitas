import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../styles/Cards.css';

function Cards({ path }) {
  const {
    renderMeals12Cards,
    renderDrinks12Cards,
  } = useContext(RecipesContext);

  let renderCards = '';

  if (path === '/meals') {
    renderCards = renderMeals12Cards;
  }
  if (path === '/drinks') {
    renderCards = renderDrinks12Cards;
  }

  return (
    <div>
      { renderCards.map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="card-container"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ path === '/meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt="Imagem da receita"
            className="card-image"
          />

          <h3 data-testid={ `${index}-card-name` } className="card-title">
            { path === '/meals' ? recipe.strMeal : recipe.strDrink }
          </h3>
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Cards;
