import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { readLocalStorage } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Favorites.css';

const copy = require('clipboard-copy');

function FavoriteRecipesCards() {
  const getFavorites = readLocalStorage('favoriteRecipes');
  const [render, setRender] = useState(getFavorites);
  const [copiedMsgVisibility, setCopiedMsgVisibility] = useState(false);

  const handleClick = ({ target: { name } }) => {
    if (getFavorites.length === 0) return [];

    const drinks = getFavorites.filter((drink) => drink.type === 'drink');
    const meals = getFavorites.filter((meal) => meal.type === 'meal');

    if (name === 'drinks' && drinks) {
      return setRender(drinks);
    }

    if (name === 'meals' && meals) {
      return setRender(meals);
    }

    if (name === 'all') {
      setRender(getFavorites);
    }
  };

  const removeFromLocalStorage = ({ target }) => {
    const filter = getFavorites.filter((item) => item.id !== target.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    setRender(filter);
  };

  const shareLink = ({ target }) => {
    const linkRef = `http://localhost:3000/${target.name}s/${target.id}`;
    const showMsgTime = 5000;
    setCopiedMsgVisibility(true);
    setTimeout(() => setCopiedMsgVisibility(false), showMsgTime);
    copy(linkRef);
    return linkRef;
  };

  return (
    <div>
      <div className="section-container">
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="btn btn-secondary btn-lg btn-block"
          name="meals"
          onClick={ handleClick }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="btn btn-secondary btn-lg btn-block"
          name="drinks"
          onClick={ handleClick }
        >
          Drinks
        </button>

        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="btn btn-secondary btn-lg btn-block"
          name="all"
          onClick={ handleClick }
        >
          All
        </button>
      </div>

      <div>
        { render.map((favoriteRecipe, index) => (
          <div key={ index } className="card-container">
            <div>
              <button
                type="button"
                onClick={ removeFromLocalStorage }
                className="btn"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite Button"
                  id={ favoriteRecipe.id }
                />
              </button>

              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ shareLink }
                className="btn"
              >
                <img
                  src={ shareIcon }
                  alt="Share Button"
                  id={ favoriteRecipe.id }
                  name={ favoriteRecipe.type }
                />
              </button>

              { copiedMsgVisibility && (<p data-testid="link-copied">Link copied!</p>) }

            </div>

            <Link
              to={ `/${favoriteRecipe.type}s/${favoriteRecipe.id}` }
            >
              <img
                src={ favoriteRecipe.image }
                alt="Drink"
                className="card-image"
                data-testid={ `${index}-horizontal-image` }
              />

              <h3
                data-testid={ `${index}-horizontal-name` }
                className="card-title-favorite"
              >
                { favoriteRecipe.name }
              </h3>

            </Link>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
              className="card-subtitle-favorite"
            >
              { favoriteRecipe.alcoholicOrNot.length > 1
                ? favoriteRecipe.alcoholicOrNot
                : `${favoriteRecipe.nationality} - ${favoriteRecipe.category}` }
            </h4>

          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipesCards;
