import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
// import Meals from '../pages/Meals';

describe('Testa o componente Search Bar', () => {
  it('Testa se o componente é renderizado na paǵina', () => {
    renderWithRouter(<App />);
    const searchTopButton = screen.getByTestId('search-top-btn');
    expect(searchTopButton).toBeInTheDocument();
  });

  it('Testa se o Alert é disparado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    const searchTopButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId('search-input');
    userEvent.type(inputValueFilter, 'aa');

    const firstLbutton = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLbutton);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchBtn);
    global.alert = jest.fn();
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(inputValueFilter).toHaveProperty('value', 'aa');
  });

  it('Testa se filtra com a primeira letra', async () => {
    enderWithRouter(<App />);
    const inputValueFilter = screen.getByTestId('search-input');
    userEvent.type(inputValueFilter, 'a');

    const firstLbutton = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLbutton);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchBtn);

    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') { return Promise.resolve(meals); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: () => Promise.resolve(meals),
    // });
    // expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
