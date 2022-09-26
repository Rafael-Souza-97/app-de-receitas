import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

function Drinks({ match: { path } }) {
  return (
    <div>
      <Header title="Drinks" />
      <Category path={ path } />
      <Recipes path={ path } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Drinks;
