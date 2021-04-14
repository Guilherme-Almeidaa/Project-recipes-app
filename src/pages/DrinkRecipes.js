import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Category from '../components/Category';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import { getCurrenceRecipesDrinksName } from '../services/drinkAPI';
import '../style/recipes.css';

function DrinksRecipes() {
  const [isFetching, setIsFetching] = useState(true);
  const zero = 0;
  const Twelve = 12;
  const {
    recipesFilters,
    setDrinkRecipeId,
    setRecipesFilters,
    setInitialRecipes,
  } = useContext(RecipesContext);
  const filterRecipesTwelve = recipesFilters !== null
    ? recipesFilters
      .slice(zero, Twelve)
    : [];

  useEffect(() => {
    getCurrenceRecipesDrinksName('').then((response) => {
      setRecipesFilters(response.drinks);
      setInitialRecipes(response.drinks);
      setIsFetching(false);
    });
  }, [setRecipesFilters,setInitialRecipes]);

  if (recipesFilters !== null && recipesFilters.length === 1) {
    const { idDrink } = recipesFilters[zero];
    setDrinkRecipeId(idDrink);
    return <Redirect to={ `/bebidas/${idDrink}` } />;
  }

  const showDetails = (id) => {
    setDrinkRecipeId(id);
  };

  const handleClick = (id) => {
    setDrinkRecipeId(id);
  };

  return (
    <div>
      <Header />
      <Category />
      <div className="recipes">
        {isFetching ? <Loading /> : filterRecipesTwelve.map((recipe, index) => (
          <Link
            type="button"
            onClick={ () => showDetails(recipe.idDrink) }
            to={ `/bebidas/${recipe.idDrink}` }
            data-testid={ `${index}-recipe-card` }
            key={ index }
            className="cards-recipes"
          >
            <p data-testid={ `${index}-card-name` }>

              {recipe.strDrink}
            </p>
            <Link
              to={ `/bebidas/${recipe.idDrink}` }
              onClick={ () => handleClick(recipe.idDrink) }
            >
              <img
                className="imgs-cards"
                data-testid={ `${index}-card-img` }
                alt="receitas"
                src={ recipe.strDrinkThumb }
              />
            </Link>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksRecipes;
