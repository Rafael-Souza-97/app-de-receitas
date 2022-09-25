import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/Favorite-Recipes';

const favoriteRecipes = '/favorite-recipes';

describe('Testa a página Favorite-Recipes', () => {
  it('Testa a rota "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    history.push(favoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    const header = screen.getByTestId('profile-top-btn');
    expect(header).toBeInTheDocument();
  });
});
