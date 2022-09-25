import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactContext from './RecipesContext';
import { fetchMeals12Cards, fetchDrinks12Cards } from '../services/fetchs/fetch12Cards';

function RecipesProvider({ children }) {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const [renderMeals12Cards, setRenderMeals12Cards] = useState([]);
  const [renderDrinks12Cards, setRenderDrinks12Cards] = useState([]);

  useEffect(() => {
    const mealsData = async () => {
      const cards = await fetchMeals12Cards();
      setRenderMeals12Cards(cards);
    };

    const drinksData = async () => {
      const cards = await fetchDrinks12Cards();
      setRenderDrinks12Cards(cards);
    };

    mealsData();
    drinksData();
  }, []);

  const contextValue = {
    userLogin,
    renderMeals12Cards,
    renderDrinks12Cards,
    setUserLogin,
    setRenderMeals12Cards,
    setRenderDrinks12Cards,
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
