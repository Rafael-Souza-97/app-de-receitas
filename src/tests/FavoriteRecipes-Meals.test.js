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

    const favoriteRedirect = screen.getByTestId('favorite-redirect');
    expect(favoriteRedirect).toBeInTheDocument();
    userEvent.click(favoriteRedirect);

    const favoriteImg = screen.getByTestId('0-horizontal-image');
    expect(favoriteImg).toBeInTheDocument();

    const mealTitle = screen.getByText('Corba');
    expect(mealTitle).toBeInTheDocument();

    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealBtn).toBeInTheDocument();
    userEvent.click(mealBtn);

    const favoriteHeartBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteHeartBtn).toBeInTheDocument();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    expect(mealTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    userEvent.click(mealBtn);
    expect(mealTitle).toBeInTheDocument();

    userEvent.click(favoriteHeartBtn);
    expect(mealTitle).not.toBeInTheDocument();

    expect(mealTitle).not.toBeInTheDocument();
  });
});
