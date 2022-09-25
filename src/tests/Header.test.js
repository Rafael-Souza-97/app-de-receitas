import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouber from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testa o componente Header', () => {
  it('Testa se os elementos são renderizados', () => {
    renderWithRouber(<Header />);
    const profileLink = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileLink).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
});
