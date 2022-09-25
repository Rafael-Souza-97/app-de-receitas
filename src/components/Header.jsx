import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <div>
      <img
        src={ profileIcon }
        data-testid="profile-top-btn"
        alt="Ícone de perfil"
      />
      {(title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && <img
        src="../images/searchIcon.svg"
        data-testid="search-top-btn"
        alt="Search Icon"
      />}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
