import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página de login', () => {
  it('Testa o input de email', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');
    expect(emailInput).toHaveProperty('value', 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveProperty('value', '1234567');

    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);
  });
});
