import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

const PROFILE_URL = '/profile';

describe('Testa a página Profile', () => {
  it('Testa a rota "/profiles"', () => {
    const { history } = renderWithRouter(<Profile />);

    history.push(PROFILE_URL);
    expect(history.location.pathname).toBe('/profile');

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
