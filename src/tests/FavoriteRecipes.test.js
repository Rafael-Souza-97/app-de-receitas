import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de detalhes das receitas', () => {
  it('Testa a página de Favoritos com Drinks', async () => {
    localStorage.clear();

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

      const drinkCard0Principal = screen.getByTestId('0-recipe-card');
      userEvent.click(drinkCard0Principal);
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

    const drinkTitle = screen.getByText('GG');
    expect(drinkTitle).toBeInTheDocument();

    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkBtn).toBeInTheDocument();
    userEvent.click(drinkBtn);

    expect(drinkTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(drinkTitle).toBeInTheDocument();

    const favoriteHeartBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteHeartBtn).toBeInTheDocument();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    expect(drinkTitle).toBeInTheDocument();
  });

  it('Testa o botão de remover receita', async () => {
    renderWithRouter(<App />);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    userEvent.click(favoriteBtn);
    expect(getFavoriteRecipes).toHaveLength(1);
  });
});
