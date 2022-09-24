import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const MEALS_URL = '/meals';
const DRINKS_URL = '/drinks';

describe('Testa o componente Footer', () => {
  it('Testa o Footer', () => {
    const { history } = renderWithRouter(<App />);

    history.push(MEALS_URL);
    expect(history.location.pathname).toBe('/meals');

    // ↓ Depois que montarmos esta página, iremos apagar este teste! ↓
    const mealsTitle = screen.getByRole('heading', { level: 3, name: 'Meals' });
    expect(mealsTitle).toBeInTheDocument();

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealsIcon).toBeInTheDocument();

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Testa a rota "/drinks"', () => {
    const { history } = renderWithRouter(<App />);

    history.push(MEALS_URL);
    expect(history.location.pathname).toBe('/meals');

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);

    // ↓ Depois que montarmos esta página, iremos apagar este teste! ↓
    const drinksTitle = screen.getByRole('heading', { level: 3, name: /drinks/i });
    expect(drinksTitle).toBeInTheDocument();

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Testa a rota "/meals"', () => {
    const { history } = renderWithRouter(<App />);

    history.push(DRINKS_URL);
    expect(history.location.pathname).toBe('/drinks');

    const mealsIcon = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealsIcon).toBeInTheDocument();
    userEvent.click(mealsIcon);

    // ↓ Depois que montarmos esta página, iremos apagar este teste! ↓
    const mealsTitle = screen.getByRole('heading', { level: 3, name: /meals/i });
    expect(mealsTitle).toBeInTheDocument();

    const footer = screen.getByTestId(/footer/i);
    expect(footer).toBeInTheDocument();
  });
});
