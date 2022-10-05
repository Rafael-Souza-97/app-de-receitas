import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { favoriteMealCreator, favoriteDrinkCreator } from '../services/objCreator';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Details.css';

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
      setFavoriteRecipes(getFavoriteRecipes);
      if (filteredRecipes.length > 0) {
        setIsFavorite(true);
      }
    }
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [id]);

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
    setTimeout(() => setCopiedMsgVisibility(false), showMsgTime);
  };

  const mapDrinks = () => {
    const info = dataDrink.map((element, index) => (
      <div key={ index }>
        <div className="img-container">
          <div className="image-recipe-details-container">
            <img
              data-testid="recipe-photo"
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              className="image-recipe-details"
            />
          </div>

          <div className="btn-container">
            <button
              type="button"
              onClick={ handleFavoriteDrinkBtn }
              className="btn"
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
              className="btn"
              data-testid="share-btn"
              type="button"
              onClick={ handleShareBtn }
            >
              <img src={ shareIcon } alt="Share Button" />
            </button>

            {copiedMsgVisibility && (<p>Link copied!</p>)}

          </div>

          <h2 data-testid="recipe-title" className="title-detail">
            {element.strDrink}
          </h2>
        </div>

        <div className="text-category">
          <h3>Category</h3>
          <ul className="list-group">
            <li className="list-group-item">
              {element.strCategory}
            </li>
            <li
              data-testid="recipe-category"
              className="list-group-item"
            >
              {element.strAlcoholic}
            </li>
          </ul>
        </div>

        <div className="preparation">
          <h2>
            Preparation Instructions
          </h2>
          <div className="container-instructions">
            <p data-testid="instructions">
              {element.strInstructions}
            </p>
          </div>
        </div>

        <div className="text-category">
          <h3>Ingredients</h3>
          <ul className="list-group">
            {ingredientesAndMeasuresDrink.map((ingrediente, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="list-group-item"
              >
                {ingrediente}

              </li>
            ))}
          </ul>
        </div>
      </div>
    ));
    return info;
  };

  const mapMeals = () => {
    const info = dataMeal.map((element, index) => (
      <div key={ index } className="main-detail">
        <div className="img-container">
          <div className="image-recipe-details-container">
            <img
              data-testid="recipe-photo"
              src={ element.strMealThumb }
              alt={ element.strMeal }
              className="image-recipe-details"
            />
          </div>
          <div className="btn-container">
            <button
              type="button"
              onClick={ handleFavoriteMealBtn }
              className="btn"
            >
              {isFavorite ? (
                <img
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  alt="Favorite Button"
                  className="btn"
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
              className="btn"
            >
              <img
                src={ shareIcon }
                alt="Share Button"
              />
            </button>
            {copiedMsgVisibility && (
              <div>Link copied!</div>
            )}
          </div>
          <h1 data-testid="recipe-title" className="title-detail">
            {element.strMeal}
          </h1>
        </div>

        <div className="text-category">
          <h2>Category</h2>
          <ul className="list-group">
            <li data-testid="recipe-category" className="list-group-item">
              {element.strCategory}
            </li>
          </ul>
        </div>

        <div className="preparation">
          <h2>Preparation Instructions</h2>
          <iframe
            data-testid="video"
            title="video"
            src={ `https://www.youtube.com/embed/${element.strYoutube.split('=')[1]}` }
            className="iframe"
          />
          <div className="text">
            <p data-testid="instructions" className="text-justify">
              {element.strInstructions}
            </p>
          </div>
        </div>

        <div className="text-category">
          <h2>Ingredients</h2>
          <ul className="list-group">
            {ingredientesAndMeasuresMeal.map((el, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="list-group-item"
              >
                {el}

              </li>
            ))}
          </ul>
        </div>
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
