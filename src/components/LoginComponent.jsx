import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/Login.css';

function LoginComponent({ handleChange, handleLoginButton, isDisabled }) {
  const { userLogin, setUserLogin } = useContext(RecipesContext);
  return (
    <div className="form-bg">
      <div className="container-form">
        <div className="row">
          <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
            <div className="form-container">
              <form className="form-horizontal">
                <h3 className="title-form">Login</h3>
                <div className="form-group">
                  <span className="input-icon"><i className="fa fa-user" /></span>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Username"
                    name="email"
                    value={ userLogin.email }
                    onChange={ handleChange }
                    data-testid="email-input"
                  />
                </div>
                <div className="form-group">
                  <span className="input-icon"><i className="fa fa-lock" /></span>
                  <input
                    className="form-control password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ userLogin.password }
                    onChange={ handleChange }
                    data-testid="password-input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-btn"
                  disabled={ isDisabled }
                  onClick={ handleLoginButton }
                  data-testid="login-submit-btn"
                >
                  Login

                </button>
                <span className="register"><a href="/" className="register">Register / Signup</a></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
