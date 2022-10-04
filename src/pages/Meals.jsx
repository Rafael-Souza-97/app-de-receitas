import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import '../styles/Meals.css';

function Meals({ match: { path } }) {
  return (
    <div>
      <div className="meals-bg ">
        <Header title="Meals" />
        <Recipes path={ path } />
        <Footer />
      </div>
    </div>
  );
}

Meals.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}.isRequired;

export default Meals;
