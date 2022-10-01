import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de detalhes das receitas', () => {
  it('Testa o botão de favoritar receita', async () => {
    localStorage.clear();

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    await waitFor(() => {
      const mealCard0Principal = screen.getByTestId('0-recipe-card');
      userEvent.click(mealCard0Principal);
    });

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      userEvent.click(favoriteBtn);
      expect(getFavoriteRecipes).toHaveLength(1);
    });
  });

  it('Testa o botão de compartilhar receita', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
    });
  });

  it('Testa se a lista de ingredientes é renderizada', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      const ingredientList = screen.getAllByTestId(/0-ingredient-name-and-measure/i);
      expect(ingredientList).toHaveLength(2);
    });
  });
});
