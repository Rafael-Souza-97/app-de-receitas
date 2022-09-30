import React from 'react';
import { Link } from 'react-router-dom';
// import { readLocalStorage } from '../services/localStorage';
import '../styles/Profile.css';

function ProfileButtons() {
  // const userEmail = readLocalStorage('user');

  return (
    <div className="section-container">
      <div>
        <h3 data-testid="profile-email" className="email">
          User Email
        </h3>
      </div>

      <div>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="btn btn-secondary btn-lg btn-block"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="btn btn-secondary btn-lg btn-block"
          >
            Favorite Recipes
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="btn btn-lg btn-block btn-outline-danger"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileButtons;
