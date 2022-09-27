import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  it('Testa se os elementos são renderizados', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa se o botão search está funcionando', () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId('search-top-btn');
    const searchInput = screen.findByTestId('search-input');
    userEvent.click(searchTopButton);
    waitFor(() => expect(searchInput).toBeInTheDocument());
  });
});
