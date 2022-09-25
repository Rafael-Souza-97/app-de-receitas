import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testa o componente Header', () => {
  it('Testa se os elementos são renderizados', () => {
    renderWithRouter(<Meals />);

    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa se o botão search está funcionando', () => {
    renderWithRouter(<Meals />);

    const searchTopButton = screen.getByTestId('search-top-btn');
    const searchInput = screen.findByTestId('search-input');
    userEvent.click(searchTopButton);
    waitFor(() => expect(searchInput).toBeInTheDocument());
  });
});
