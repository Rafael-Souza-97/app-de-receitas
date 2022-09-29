import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de detalhes das receitas', () => {
  it('Testa o botão de favoritar receita', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    await waitFor(() => {
      const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
      userEvent.click(drinkIcon);

      const mealCard0Principal = screen.getByTestId('0-recipe-card');
      userEvent.click(mealCard0Principal);
    });

    await waitFor(() => {
      const ingredientList = screen.getAllByTestId(/0-ingredient-name-and-measure/i);
      expect(ingredientList).toHaveLength(1);
    });
  });

  it('Testa o botão de favoritar receita', async () => {
    localStorage.clear();

    renderWithRouter(<App />);

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      userEvent.click(favoriteBtn);
      expect(getFavoriteRecipes).toHaveLength(1);
    });
  });
});
