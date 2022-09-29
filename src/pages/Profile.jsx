import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmailFromLocalStorage } from '../services/localStorage';
import '../styles/Profile.css';

function Profile() {
  const userEmail = getEmailFromLocalStorage('user').email;
  return (
    <div className="container-fluid">
      <Header title="Profile" />

      <h2 data-testid="profile-email" className="email">{ userEmail }</h2>

      <section className="section-container">
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
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
