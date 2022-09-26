import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página Drinks', () => {
  it('Testa a rota "/drinks"', async () => {
    renderWithRouter(<App />);

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

    // Página Meals - "/meals"
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);

    // Página Drinks - "/drinks"
    const drinkCard1 = await screen.findByTestId('0-recipe-card');
    const drinkCard12 = await screen.findByTestId('11-recipe-card');

    waitFor(() => {
      expect(drinkCard1).toBeInTheDocument();
      expect(drinkCard12).toBeInTheDocument();
    });
  });
});
