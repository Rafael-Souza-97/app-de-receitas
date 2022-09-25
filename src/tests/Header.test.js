import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouber from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testa o componente Header', () => {
  it('Testa se os elementos são renderizados', () => {
    renderWithRouber(<Header />);

    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa se o botão search está funcionando', () => {
    renderWithRouber(<Header />);

    const searchTopButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopButton);
    expect(screen.findByTestId('search-input')).toBeInTheDocument();
  });
});
