import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const verifyEmaiĹog = 'email@email.com';

describe('Testa a página meals', () => {
  it('Testa a rota "/meals"', async () => {
    renderWithRouter(<App />);

    // Página de login - "/"
    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, verifyEmaiĹog);
    expect(emailInput).toHaveProperty('value', verifyEmaiĹog);

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveProperty('value', '1234567');

    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    // Página meals - "/meals"
    await waitFor(() => {
      const mealCard0Principal = screen.getByTestId('0-recipe-card');
      expect(mealCard0Principal).toBeInTheDocument();
      const breakfastButton = screen.getByTestId('Breakfast-category-filter');
      userEvent.click(breakfastButton);
      const mealCard1 = screen.getByTestId('0-recipe-card');
      expect(mealCard1).toBeInTheDocument();
      userEvent.click(breakfastButton);
      expect(mealCard1).toBeInTheDocument();
      const allButton = screen.getByTestId('All-category-filter');
      userEvent.click(allButton);
    });
  });

  it('Testa os filters', async () => {
    renderWithRouter(<App />);
    await waitFor(() => {
      const breakfastButton = screen.getByTestId('Breakfast-category-filter');
      userEvent.click(breakfastButton);
    });
  });

  it('Testa os cards pelas imagens', async () => {
    renderWithRouter(<App />);
    await waitFor(() => {
      const cardsImages = screen.getAllByTestId(/card-img/i);
      expect(cardsImages).toHaveLength(12);
    });
  });
});

describe('Testes do Search Bar', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, verifyEmaiĹog);

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });

    const searchTopButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopButton);
  });

  it('Testa se o Alert é disparado', () => {
    const inputValueFilter = screen.getByTestId('search-input');
    userEvent.type(inputValueFilter, 'aa');
    const firstLbutton = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLbutton);
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchBtn);
    global.alert = jest.fn();
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('Testa a rota "/meals"', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
