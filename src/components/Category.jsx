import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { mealsCategories, drinksCategories } from '../services/fetchs/fetch5Categories';
import '../styles/Category.css';

function Category({ path }) {
  const {
    renderMealsCategoriesButtons,
    renderDrinksCategoriesButtons,
    selectedCategoryMeals,
    selectedCategoryDrinks,
    setRenderMealsCategoriesButtons,
    setRenderDrinksCategoriesButtons,
    setSelectedCategoryMeals,
    setSelectedCategoryDrinks,
  } = useContext(RecipesContext);

  useEffect(() => {
    const mealsCategoriesButtons = async () => {
      const categories = await mealsCategories();
      setRenderMealsCategoriesButtons(categories);
    };

    const drinksCategoriesButtons = async () => {
      const categories = await drinksCategories();
      setRenderDrinksCategoriesButtons(categories);
    };

    mealsCategoriesButtons();
    drinksCategoriesButtons();
  }, [setRenderMealsCategoriesButtons, setRenderDrinksCategoriesButtons]);

  let categories = '';

  if (path === '/meals') {
    categories = renderMealsCategoriesButtons;
  }
  if (path === '/drinks') {
    categories = renderDrinksCategoriesButtons;
  }

  const handleClick = ({ target: { name } }) => {
    if (path === '/meals') {
      setSelectedCategoryMeals((prev) => {
        if (name === prev) return '';
        return name;
      });
    } else {
      setSelectedCategoryDrinks((prev) => {
        if (name === prev) return '';
        return name;
      });
    }
  };

  useEffect(() => {

  }, [selectedCategoryMeals, selectedCategoryDrinks]);

  return (
    <div className="container-sm">
      <button
        type="button"
        data-testid="All-category-filter"
        className="btn btn-outline-secondary all"
        onClick={ () => (path === '/meals' ? (
          setSelectedCategoryMeals('')) : setSelectedCategoryDrinks('')
        ) }
      >
        All
      </button>

      { categories.map((category, index) => (
        <div
          key={ index }
        >
          <button
            type="button"
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            className="btn btn-outline-secondary"
            onClick={ handleClick }
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
