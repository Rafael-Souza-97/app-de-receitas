import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/Done-Recipes';

const doneRecipes = '/done-recipes';

describe('Testa a página Done-Recipes', () => {
  it('Testa a rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    history.push(doneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    const header = screen.getByTestId('profile-top-btn');
    expect(header).toBeInTheDocument();
  });
});
