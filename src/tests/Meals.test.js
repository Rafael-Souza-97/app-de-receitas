import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

// const MEALS_URL = '/meals';

describe('Testa a página meals', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

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
