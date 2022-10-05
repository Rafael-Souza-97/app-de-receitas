import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/1891016_user_male_avatar_account_profile_icon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div>
      <div className="header-main">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            className="btn profile-btn"
            alt="Profile icon"
          />
        </Link>
        <h1 data-testid="page-title" className="title-page">{title}</h1>
        {(title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes')
      && (
        <button
          type="button"
          className="btn"
          onClick={ () => setSearchOpen(!searchOpen) }
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            className="btn search-btn"
            alt="Search Icon"
          />
        </button>
      )}
      </div>
      {searchOpen
        && (
          <div>
            <SearchBar pageTitle={ title } />
          </div>)}

    </div>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
