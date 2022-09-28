import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const USER_EMAIL = 'email@email.com';

describe('Testa a página Profile', () => {
  it('Testa a rota "/profiles"', async () => {
    renderWithRouter((<App />));

    // Página de login - "/"
    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, USER_EMAIL);
    expect(emailInput).toHaveProperty('value', USER_EMAIL);

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveProperty('value', '1234567');

    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();
    userEvent.click(profileLink);

    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    const userEmailText = screen.getByText(USER_EMAIL);
    expect(userEmailText).toBeInTheDocument();

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    expect(doneRecipesButton).toBeInTheDocument();

    const favoritesRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoritesRecipesButton).toBeInTheDocument();

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);
  });
});
