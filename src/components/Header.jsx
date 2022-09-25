import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <div>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Ícone de perfil"
        />
      </Link>
      {(title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && (
        <button
          type="button"
          // Esse botão tem que tem que mostrar a barra de busca
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
          />
        </button>
      )}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
