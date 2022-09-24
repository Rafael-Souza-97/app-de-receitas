import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const contextValue = {
    userLogin,
    setUserLogin,
  };

  return (
    <ReactContext.Provider value={ contextValue }>
      {children}
    </ReactContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
