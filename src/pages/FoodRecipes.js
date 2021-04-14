import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Category from '../components/Category';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import { getCurrenceRecipesFoodsName } from '../services/foodAPI';
import '../style/recipes.css';

function FoodRecipes() {
  const [isFetching, setIsFetching] = useState(true);
  const zero = 0;
  const Twelve = 12;
  const {
    recipesFilters,
    setMealRecipeId,
    setRecipesFilters,
    btnFilter,
    setInitialRecipes,
  } = useContext(RecipesContext);
  const filterRecipesTwelve = recipesFilters !== null
    ? recipesFilters.slice(zero, Twelve)
    : [];

  useEffect(() => {
    getCurrenceRecipesFoodsName('').then((response) => {
      setRecipesFilters(response.meals);
      setInitialRecipes(response.meals);
      setIsFetching(false);
    });
  }, [setRecipesFilters,setInitialRecipes]);

  if (
    recipesFilters !== null
    && recipesFilters.length === 1
    && btnFilter === false
  ) {
    const { idMeal } = recipesFilters[zero];
    setMealRecipeId(idMeal);
    return <Redirect to={ `/comidas/${idMeal}` } />;
  }

  const showDetails = (id) => {
    setMealRecipeId(id);
  };

  const handleClick = (id) => {
    setMealRecipeId(id);
  };

  return (
    <div>
      <Header />
      <Category />
      <div className="recipes">
        {isFetching ? <Loading /> : filterRecipesTwelve.map((recipe, index) => (
          <Link
            type="button"
            onClick={ () => showDetails(recipe.idMeal) }
            data-testid={ `${index}-recipe-card` }
            key={ index }
            className="cards-recipes"
            to={ `/comidas/${recipe.idMeal}` }
          >
            <p data-testid={ `${index}-card-name` }>

              {recipe.strMeal}
            </p>
            <Link
              to={ `/comidas/${recipe.idMeal}` }
              onClick={ () => handleClick(recipe.idMeal) }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="imgs-cards"
                alt="receitas"
                src={ recipe.strMealThumb }
              />
            </Link>
          </Link>
        ))}
      </div>
      <Footer />

    </div>
  );
}

export default FoodRecipes;
