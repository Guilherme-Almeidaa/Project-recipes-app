import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import perfilIcon from '../images/profileIcon.svg';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user')
    || JSON.stringify({ email: '' }));
  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Perfil
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
      <h2 data-testid="profile-email">{email}</h2>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
