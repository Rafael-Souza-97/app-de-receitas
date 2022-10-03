import React from 'react';
import FavoriteRecipesCards from '../components/FavoriteRecipesCards';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" />
      <FavoriteRecipesCards />
    </div>
  );
}

export default FavoriteRecipes;
