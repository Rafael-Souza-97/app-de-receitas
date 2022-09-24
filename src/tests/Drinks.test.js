import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Drinks from '../pages/Drinks';

const DRINKS_URL = '/drinks';

describe('Testa a página Drinks', () => {
  it('Testa a rota "/drinks"', () => {
    const { history } = renderWithRouter(<Drinks />);

    history.push(DRINKS_URL);
    expect(history.location.pathname).toBe('/drinks');

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
