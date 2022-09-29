import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import { favoriteMealCreator, favoriteDrinkCreator } from '../services/objCreator';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({ id, path, dataMeal, dataDrink,
  ingredientesAndMeasuresDrink, ingredientesAndMeasuresMeal }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedMsgVisibility, setCopiedMsgVisibility] = useState(false);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipes !== null) {
      const filteredRecipes = getFavoriteRecipes.filter((recipe) => recipe.id === id);
      if (filteredRecipes.length > 0) {
        setIsFavorite(true);
      }
    }
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteMealBtn = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      setFavoriteRecipes([...favoriteRecipes, favoriteMealCreator(dataMeal[0])]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  const handleFavoriteDrinkBtn = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      setFavoriteRecipes([...favoriteRecipes, favoriteDrinkCreator(dataDrink[0])]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  const handleShareBtn = () => {
    copy(window.location.href);

    const showMsgTime = 3000;
    setCopiedMsgVisibility(true);
    setTimeout(() => {
      setCopiedMsgVisibility(false);
    }, showMsgTime);
  };

  const mapDrinks = () => {
    const info = dataDrink.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strDrinkThumb }
          alt={ element.strDrink }
          style={ { width: '300px' } }
        />
        <button
          type="button"
          onClick={ handleFavoriteDrinkBtn }
        >
          {isFavorite ? (
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt="Favorite Button"
            />)
            : (
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Favorite Button"
              />
            )}
        </button>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleShareBtn }
        >
          <img
            src={ shareIcon }
            alt="Share Button"
          />
        </button>
        {copiedMsgVisibility && (
          <div>Link copied!</div>
        )}
        <h1
          data-testid="recipe-title"
        >
          {element.strDrink}

        </h1>
        <h2>Categoria</h2>
        <p>
          {element.strCategory}
        </p>
        <p data-testid="recipe-category">{element.strAlcoholic}</p>
        <h2>Instruções de preparo</h2>
        <p
          data-testid="instructions"
        >
          {element.strInstructions}
        </p>
        <h2>Ingredientes</h2>
        <ul>
          {ingredientesAndMeasuresDrink.map((ingrediente, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingrediente}

            </li>
          ))}
        </ul>
        <Carousel path={ path } />
      </div>
    ));
    return info;
  };

  const mapMeals = () => {
    const info = dataMeal.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strMealThumb }
          alt={ element.strMeal }
          style={ { width: '300px' } }
        />
        <button
          type="button"
          onClick={ handleFavoriteMealBtn }
        >
          {isFavorite ? (
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt="Favorite Button"
            />)
            : (
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Favorite Button"
              />
            )}
        </button>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleShareBtn }
        >
          <img
            src={ shareIcon }
            alt="Share Button"
          />
        </button>
        {copiedMsgVisibility && (
          <div>Link copied!</div>
        )}
        <h1 data-testid="recipe-title">
          {element.strMeal}
        </h1>
        <h2>Categoria</h2>
        <p data-testid="recipe-category">
          {element.strCategory}
        </p>
        <h2>Instruções de preparo</h2>
        <iframe
          data-testid="video"
          title="video"
          src={ `https://www.youtube.com/embed/${element.strYoutube.split('=')[1]}` }
          width="300"
          height="200"
        />
        <p data-testid="instructions">
          {element.strInstructions}
        </p>
        <h2>Ingredientes</h2>
        <ul>
          {ingredientesAndMeasuresMeal.map((el, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {el}

            </li>
          ))}
        </ul>
        <Carousel path={ path } />
      </div>
    ));
    return info;
  };
  const renderization = () => {
    if (path.includes('meals')) {
      return mapMeals();
    } return mapDrinks();
  };
  return (
    <>
      {id}
      {renderization()}
    </>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dataDrink: PropTypes.arrayOf(PropTypes.object.isRequired),
  dataMeal: PropTypes.arrayOf(PropTypes.object.isRequired),
  ingredientesAndMeasuresDrink: PropTypes.arrayOf(PropTypes.string.isRequired),
  ingredientesAndMeasuresMeal: PropTypes.arrayOf(PropTypes.string.isRequired),
};

RecipeDetails.defaultProps = {
  dataDrink: undefined,
  dataMeal: undefined,
  ingredientesAndMeasuresDrink: undefined,
  ingredientesAndMeasuresMeal: undefined,
};

export default RecipeDetails;
