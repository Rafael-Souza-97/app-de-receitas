import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

function Meals({ match: { path } }) {
  return (
    <div>
      <Header title="Meals" />
      <Category path={ path } />
      <Recipes path={ path } />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Meals;
