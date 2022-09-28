import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página meals', () => {
  it('Testa a rota "/meals"', async () => {
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
    waitFor(() => {
      const filterButtons = screen.getAllByTestId(/category-filter/i);
      const filterButtonsQuantity = 5;
      expect(filterButtons).toHaveLength(filterButtonsQuantity);
      expect(filterButtons[3]).toHaveTextContent(/Chicken/i);
    });

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);

    // Página Drinks - "/drinks"

    waitFor(() => {
      const filterButtons = screen.getAllByTestId(/category-filter/i);
      const filterButtonsQuantity = 5;
      expect(filterButtons).toHaveLength(filterButtonsQuantity);
      expect(filterButtons[3]).toHaveTextContent(/shake/i);

      const cocktailFilterButtom = screen.getAllByTestId(/cocktail-category-filter/i);
      expect(cocktailFilterButtom).toBeInTheDocument();
      const cardABCTitle = screen.getByRole('heading', { level: 3, name: /abc/i });
      expect(cardABCTitle).toBeInTheDocument();

      userEvent.click(cocktailFilterButtom);
    });
  });
});
