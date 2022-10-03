import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { DONE_RECIPES, readLocalStorage } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [dataDoneRecipes, setDataDoneRecipes] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [type, setType] = useState('all');
  const [copiedMsgVisibility, setCopiedMsgVisibility] = useState(false);
  console.log(dataDoneRecipes);
  useEffect(() => {
    const getDoneRecipes = readLocalStorage(DONE_RECIPES);
    setDataDoneRecipes(getDoneRecipes);
  }, []);

  useEffect(() => {
    if (dataDoneRecipes !== null) {
      const meals = dataDoneRecipes.filter((e) => e.type === 'meal');
      setDataMeals(meals);
      const drinks = dataDoneRecipes.filter((e) => e.type === 'drink');
      setDataDrinks(drinks);
    }
  }, [dataDoneRecipes]);

  const filteredMeals = () => {
    setType('meal');
  };

  const filteredDinks = () => {
    setType('drink');
  };

  const filteredAll = () => {
    setType('all');
  };

  const filteredDataMealOrDrink = (array) => (
    (
      array.map((element, index) => (
        <div key={ index }>
          <Link
            to={ element.type === 'meal' ? `/meals/${element.id}`
              : `/drinks/${element.id}` }
          >
            <img
              src={ element.image }
              alt="index"
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '100px' } }
            />
          </Link>
          <h2 data-testid={ `${index}-horizontal-top-text` }>
            {`${element.nationality} - ${element.category}`}
          </h2>
          <Link
            to={ element.type === 'meal' ? `/meals/${element.id}`
              : `/drinks/${element.id}` }
          >
            <h2 data-testid={ `${index}-horizontal-name` }>
              {element.name}
              {' '}
            </h2>
          </Link>
          <h2 data-testid={ `${index}-horizontal-done-date` }>
            {element.doneDate}
          </h2>
          <h2 data-testid={ `${index}-${element.tags[0]}-horizontal-tag` }>
            {element.tags[0]}
          </h2>
          <h2 data-testid={ `${index}-${element.tags[1]}-horizontal-tag` }>
            {element.tags[1]}
          </h2>
          <h2 data-testid={ `${index}-horizontal-top-text` }>
            {element.alcoholicOrNot}
          </h2>
          <button
            type="submit"
            onClick={ () => {
              copy(`http://localhost:3000/${element.type}s/${element.id}`);
              const showMsgTime = 3000;
              setCopiedMsgVisibility(true);
              setTimeout(() => setCopiedMsgVisibility(false), showMsgTime);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="iconButton"
            />
          </button>
        </div>
      ))
    )
  );
  const renderFiltered = () => {
    if (type === 'all' && dataDoneRecipes !== null) {
      return filteredDataMealOrDrink(dataDoneRecipes);
    }
    if (type === 'drink' && dataDrinks !== null) {
      return filteredDataMealOrDrink(dataDrinks);
    }
    if (type === 'meal' && dataMeals !== null) {
      return filteredDataMealOrDrink(dataMeals);
    }
  };
  return (
    <div>
      <div>
        <Header title="Done Recipes" />
      </div>
      <div>
        <button
          onClick={ filteredAll }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ filteredMeals }
          type="submit"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ filteredDinks }
          type="submit"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        {renderFiltered()}
        {copiedMsgVisibility && (<p>Link copied!</p>)}
      </div>
    </div>
  );
}

export default DoneRecipes;
