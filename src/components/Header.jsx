import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div>
      <header>
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Profile icon"
          />
        </Link>
        {(title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && (
        <button
          type="button"
          onClick={ () => setSearchOpen(!searchOpen) }
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
          />
        </button>
      )}
        {searchOpen && <input data-testid="search-input" />}
        <h1 data-testid="page-title">{title}</h1>
      </header>
    </div>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
