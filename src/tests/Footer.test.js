import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

const MEALS_URL = '/meals';
const DRINKS_URL = '/drinks';

describe('Testa o componente Footer', () => {
  it('Testa o Footer', () => {
    const { history } = renderWithRouter(<Footer />);

    history.push(MEALS_URL);
    expect(history.location.pathname).toBe('/meals');

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Testa a rota "/drinks"', () => {
    const { history } = renderWithRouter(<Footer />);

    history.push(MEALS_URL);
    expect(history.location.pathname).toBe('/meals');

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();
    userEvent.click(drinkIcon);

    expect(drinkIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Testa a rota "/meals"', () => {
    const { history } = renderWithRouter(<Footer />);

    history.push(DRINKS_URL);
    expect(history.location.pathname).toBe('/drinks');

    const mealsIcon = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealsIcon).toBeInTheDocument();
    userEvent.click(mealsIcon);

    expect(mealsIcon).toBeInTheDocument();

    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkIcon).toBeInTheDocument();
  });
});
