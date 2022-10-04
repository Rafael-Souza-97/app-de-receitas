import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div>
      <footer
        className="footer"
        data-testid="footer"
      >
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
            className="btn drink-icon"
          />
        </Link>

        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="meal Icon"
            data-testid="meals-bottom-btn"
            className="btn meal-icon"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
