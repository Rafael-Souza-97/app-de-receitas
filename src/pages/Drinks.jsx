import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Drinks.css';

function Drinks({ match: { path } }) {
  return (
    <div className="drinks-bg">
      <Header title="Drinks" />
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
