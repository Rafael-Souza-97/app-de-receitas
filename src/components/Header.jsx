import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
// import RecipesContext from '../context/RecipesContext';
import '../styles/Header.css';

function Header({ title }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="container-searchBar">
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
