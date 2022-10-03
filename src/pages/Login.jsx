import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { addMealsTokenLocalStorage,
  addDrinksTokenLocalStorage,
  addEmailLocalStorage } from '../services/localStorage';
import LoginComponent from '../components/LoginComponent';

function Login({ history }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const { userLogin, setUserLogin } = useContext(RecipesContext);

  const validateLogin = () => {
    const { email, password } = userLogin;
    const regularExpression = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const verifyEmail = regularExpression.test(email);
    const SIX = 6;
    const verifyPassword = password.length >= SIX;
    const emailAndPasswordVerify = verifyEmail && verifyPassword;
    setIsDisabled(!emailAndPasswordVerify);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
    validateLogin();
  };

  const handleLoginButton = (event) => {
    event.preventDefault();

    addMealsTokenLocalStorage(1);
    addDrinksTokenLocalStorage(1);
    addEmailLocalStorage(userLogin.email);

    history.push('/meals');
  };

  return (
    <div>
      <LoginComponent
        validateLogin={ validateLogin }
        handleChange={ handleChange }
        handleLoginButton={ handleLoginButton }
        isDisabled={ isDisabled }
      />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Login;
