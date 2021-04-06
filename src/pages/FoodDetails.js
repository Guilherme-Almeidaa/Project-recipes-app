import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Carousel } from 'antd';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import {
  fetchAPI, handleIngredients,
  TWO_THOUSAND, SIX,
} from '../services/helpers';
import '../style/recipeDetail.css';

function FoodDetails() {
  const [recipeDetailFood, setRecipeDetailFood] = useState({});
  const [buttonClassName, setButtonClassName] = useState('fixedbutton');
  const [buttonText] = useState('Iniciar Receita');
  const [recommendation, setRecommendation] = useState(['']);
  const [copyText, setCopyText] = useState('');
  const [favorited, setFavorited] = useState();
  // src: https://reactrouter.com/web/api/Hooks
  const history = useHistory();
  const { pathname } = history.location;
  const mealRecipeId = pathname.split('/')[2];

  const {
    setMealRecipeId,
    setDrinkRecipeId,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const food = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`);
      const recipeFood = await food.meals;
      setRecipeDetailFood(recipeFood[0]);
      setMealRecipeId(mealRecipeId);
    };
    getAPI();
  }, [setMealRecipeId, mealRecipeId, setRecipeDetailFood]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const drinks = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinksData = await drinks.drinks;
      setRecommendation(drinksData);
    };
    fetchRecommendation();
  }, []);

  const handleCopyClick = () => {
    copy(window.location.href);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  useEffect(() => {
    if (!localStorage.favoriteRecipes) localStorage.favoriteRecipes = JSON.stringify([]);
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes)
      .filter((recipe) => recipe.id === mealRecipeId);
    if (favoriteStorage.length >= 1) {
      setFavorited(blackHeartIcon);
    } else {
      setFavorited(whiteHeartIcon);
    }
  }, [mealRecipeId]);

  useEffect(() => {
    if (!localStorage.doneRecipes) localStorage.doneRecipes = JSON.stringify([]);
    const doneStorage = JSON.parse(localStorage.doneRecipes)
      .filter((recipe) => recipe.id === mealRecipeId);
    if (doneStorage.length >= 1) {
      setButtonClassName('fixedbutton hidden');
    } else {
      setButtonClassName('fixedbutton');
    }
  }, [mealRecipeId]);

  const handleFavoriteClick = () => {
    if (favorited === whiteHeartIcon) {
      setFavorited(blackHeartIcon);
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage.concat({
        id: recipeDetailFood.idMeal,
        type: 'comida',
        area: recipeDetailFood.strArea,
        category: recipeDetailFood.strCategory,
        alcoholicOrNot: '',
        name: recipeDetailFood.strMeal,
        image: recipeDetailFood.strMealThumb,
      });
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    } else {
      setFavorited(whiteHeartIcon);
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage
        .filter((recipe) => recipe.id !== mealRecipeId);
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    }
  };

  return (
    <div>
      <div className="container-img">
        <img
          className="img-recipe"
          data-testid="recipe-photo"
          src={ recipeDetailFood.strMealThumb }
          alt="food"
        />
      </div>
      <h2 data-testid="recipe-title">{recipeDetailFood.strMeal}</h2>
      <button type="button" onClick={ handleCopyClick }>
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button type="button" onClick={ handleFavoriteClick }>
        <img data-testid="favorite-btn" src={ favorited } alt="favorite" />
      </button>
      <p>{copyText}</p>
      <p data-testid="recipe-category">{recipeDetailFood.strCategory}</p>
      <ul>
        {handleIngredients(recipeDetailFood)}
      </ul>
      <p data-testid="instructions">{recipeDetailFood.strInstructions}</p>
      <video className="video" data-testid="video" width="750" height="500" controls>
        <source src={ recipeDetailFood.strYoutube } type="video/mp4" />
        <track src={ recipeDetailFood.strYoutube } kind="captions" />
      </video>
      <Carousel>
        {
          recommendation && recommendation.length && recommendation
            .filter((_, indexFilter) => indexFilter < SIX)
            .map((drinks, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
                className="container-recomend"
              >
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drinks.strDrink}
                </p>
                <Link
                  onClick={ () => setDrinkRecipeId(drinks.idDrink) }
                  to={ `/bebidas/${drinks.idDrink}` }
                  className="container-img"
                >
                  <img
                    className="img-recipe"
                    data-testid={ `${index}-card-img` }
                    width="300"
                    src={ drinks.strDrinkThumb }
                    alt={ drinks.strDrink }
                  />
                </Link>
              </div>
            ))
        }
      </Carousel>
      <Link to={ `/comidas/${mealRecipeId}/in-progress` }>
        <button
          className={ buttonClassName }
          type="button"
          data-testid="start-recipe-btn"
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

export default FoodDetails;
