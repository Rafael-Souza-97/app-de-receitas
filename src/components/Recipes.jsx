import React from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';
import Category from './Category';

function Recipes({ path }) {
  return (
    <div>
      <Category path={ path } />
      <Cards path={ path } />
    </div>
  );
}

Recipes.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Recipes;
