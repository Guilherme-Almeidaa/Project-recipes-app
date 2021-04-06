import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import explereIcon from '../images/exploreIcon.svg';
import foodIcon from '../images/mealIcon.svg';
import '../style/footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link className="icon-footer" to="/bebidas">
        <button type="button">
          <img data-testid="drinks-bottom-btn" alt="drinks" src={ drinkIcon } />
        </button>
      </Link>
      <Link className="icon-footer" to="/explorar">
        <button type="button">
          <img data-testid="explore-bottom-btn" alt="explore" src={ explereIcon } />
        </button>
      </Link>
      <Link className="icon-footer" to="/comidas">
        <button type="button">
          <img data-testid="food-bottom-btn" alt="food" src={ foodIcon } />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
