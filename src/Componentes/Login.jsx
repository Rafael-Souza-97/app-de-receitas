import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        Email:
        <input data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input data-testid="password-input" />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
