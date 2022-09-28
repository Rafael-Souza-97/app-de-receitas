import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página Drinks', () => {
  it('Testa acesso a rota "/drinks"', async () => {
    renderWithRouter((<App />));

    // Página de login - "/"
    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');
    expect(emailInput).toHaveProperty('value', 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveProperty('value', '1234567');

    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    // Página meals - "/meals"
    await waitFor(() => {
      const breackfastButton = screen.getByTestId('Breakfast-category-filter');
      userEvent.click(breackfastButton);
      const mealCard1 = screen.getByTestId('0-recipe-card');
      expect(mealCard1).toBeInTheDocument();
      const allButton = screen.getByTestId('All-category-filter');
      userEvent.click(allButton);
    });
  });

  it('Testa a rota "/drinks"', async () => {
    renderWithRouter((<App />));

    // Página drinks - "/drinks"
    await waitFor(() => {
      const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
      expect(drinkIcon).toBeInTheDocument();
      userEvent.click(drinkIcon);
      const cocktailButton = screen.getByTestId(/cocktail-category-filter/i);
      userEvent.click(cocktailButton);
      const cocktailCards0 = screen.getByTestId(/0-recipe-card/i);
      expect(cocktailCards0).toBeInTheDocument();
      const allButton = screen.getByTestId(/All-category-filter/i);
      userEvent.click(allButton);
    });
  });

  it('Testa os filters', async () => {
    renderWithRouter(<App />);
    await waitFor(() => {
      const CocktailButton = screen.getByTestId('Cocktail-category-filter');
      userEvent.click(CocktailButton);
    });
  });
});
