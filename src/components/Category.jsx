import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../styles/Category.css';

function Category({ path }) {
  const {
    renderMeals5CategoriesButtons,
    renderDrinks5CategoriesButtons,
  } = useContext(RecipesContext);

  let categories = '';

  if (path === '/meals') {
    categories = renderMeals5CategoriesButtons;
  }
  if (path === '/drinks') {
    categories = renderDrinks5CategoriesButtons;
  }

  return (
    <div className="container-sm">
      { categories.map((category, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            className="btn btn-outline-secondary"
          >
            { category.strCategory }
          </button>
        </div>
      ))}
    </div>
  );
}

Category.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Category;
