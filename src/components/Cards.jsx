import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../styles/Cards.css';

function Cards({ path }) {
  const {
    renderMeals12Cards,
    renderDrinks12Cards,
    selectedCategoryMeals,
    selectedCategoryDrinks,
    renderMealsCategories12Cards,
    renderDrinksCategories12Cards,
    showRecipes,
    recipesMealsSearch,
    recipesDrinksSearch,
  } = useContext(RecipesContext);

  let renderCards = renderMeals12Cards;

  if (path === '/meals' && selectedCategoryMeals === '') {
    renderCards = renderMeals12Cards;
  }
  if (path === '/meals' && selectedCategoryMeals !== '') {
    renderCards = renderMealsCategories12Cards;
  }
  if (path === '/drinks' && selectedCategoryDrinks === '') {
    renderCards = renderDrinks12Cards;
  }
  if (path === '/drinks' && selectedCategoryDrinks !== '') {
    renderCards = renderDrinksCategories12Cards;
  }
  if (path === '/meals' && showRecipes) {
    renderCards = recipesMealsSearch;
  }
  if (path === '/drinks' && showRecipes) {
    renderCards = recipesDrinksSearch;
  }

  return (
    <div>
      { renderCards.map((recipe, index) => (
        <Link
          className="card-title"
          to={ path === '/meals' ? `/meals/${recipe.idMeal}`
            : `/drinks/${recipe.idDrink}` }
          key={ index }
        >
          <div
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
        </Link>
      ))}
    </div>
  );
}

Cards.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Cards;
