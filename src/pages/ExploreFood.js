import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI } from '../services/helpers';
import perfilIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreFood() {
  const { mealRecipeId, setMealRecipeId } = useContext(RecipesContext);
  useEffect(() => {
    const getAPI = async () => {
      const food = await fetchAPI('https://www.themealdb.com/api/json/v1/1/random.php');
      const recipeFood = await food.meals;
      setMealRecipeId(recipeFood[0].idMeal);
    };
    getAPI();
  }, [setMealRecipeId]);

  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Explorar Comidas
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
      <h2>Explorar Comidas por:</h2>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <Link to={ `/comidas/${mealRecipeId}` }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreFood;
