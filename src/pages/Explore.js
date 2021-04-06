import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import perfilIcon from '../images/profileIcon.svg';

function Explore() {
  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Explorar
        </h1>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ perfilIcon }
              alt="perfil"
            />
          </button>
        </Link>
      </header>
      <h2>Explorar Comidas ou Bebidas</h2>
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
