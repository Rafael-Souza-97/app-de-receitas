import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

const MEALS_URL = '/meals';

describe('Testa a página meals', () => {
  it('Testa a rota "/meals"', () => {
    const { history } = renderWithRouter(<Meals />);

    history.push(MEALS_URL);
    expect(history.location.pathname).toBe('/meals');

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
