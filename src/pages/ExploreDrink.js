import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI } from '../services/helpers';
import perfilIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreDrink() {
  const { drinkRecipeId, setDrinkRecipeId } = useContext(RecipesContext);
  useEffect(() => {
    const getAPI = async () => {
      const randomDrink = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const drink = await randomDrink.drinks;
      setDrinkRecipeId(drink[0].idDrink);
    };
    getAPI();
  }, [setDrinkRecipeId]);

  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Explorar Bebidas
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
      <h2>Explorar Bebidas por:</h2>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${drinkRecipeId}` }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
