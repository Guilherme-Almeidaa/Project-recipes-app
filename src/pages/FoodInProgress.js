import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { TWO_THOUSAND, fetchAPI } from '../services/helpers';
import '../style/recipeDetail.css';
import CheckBoxProgress from './CheckBoxProgress';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const mealRecipeId = pathname.split('/')[2];

  const [copyText, setCopyText] = useState('');
  const [favorited, setFavorited] = useState();
  const [buttonDone, setButtonDone] = useState(true);

  const { recipeDetailFood, setMealRecipeId, setRecipeDetailFood } = useContext(
    RecipesContext,
  );

  useEffect(() => {
    const getAPI = async () => {
      const food = await fetchAPI(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`,
      );
      const recipeFood = await food.meals;
      setRecipeDetailFood(recipeFood[0]);
      setMealRecipeId(mealRecipeId);
    };
    getAPI();
  }, [setMealRecipeId, mealRecipeId, setRecipeDetailFood]);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) localStorage.favoriteRecipes = JSON.stringify([]);
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes).filter(
      (recipe) => recipe.id === mealRecipeId,
    );
    if (favoriteStorage.length >= 1) {
      setFavorited(blackHeartIcon);
    } else {
      setFavorited(whiteHeartIcon);
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
      const newFavoriteStorage = favoriteStorage.filter(
        (recipe) => recipe.id !== mealRecipeId,
      );
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    }
  };

  const handleCopyClick = () => {
    const { href } = window.location;
    const indexStart = 0;
    const recipePath = href.substring(indexStart, href.indexOf('/in-progress'));
    copy(recipePath);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  const handleButtonDone = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    console.log(recipeDetailFood);
    const ingredientsUsed = inProgressRecipes.meals[mealRecipeId];

    const allIngredients = Object
      .keys(recipeDetailFood).filter(
        (key) => key
          .includes('strIngredient')
          && recipeDetailFood[key] !== ''
          && recipeDetailFood[key] !== null,
      );

    console.log(ingredientsUsed.length, allIngredients.length);

    if (ingredientsUsed.length === allIngredients.length) {
      setButtonDone(false);
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetailFood.strMealThumb }
        alt="food"
      />
      <h2 data-testid="recipe-title">{recipeDetailFood.strMeal}</h2>
      <button type="button" onClick={ handleCopyClick }>
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button type="button" onClick={ handleFavoriteClick }>
        <img data-testid="favorite-btn" src={ favorited } alt="favorite" />
      </button>
      <p>{copyText}</p>
      <p data-testid="recipe-category">{recipeDetailFood.strCategory}</p>
      <CheckBoxProgress handleButtonDone={ handleButtonDone } />
      <p data-testid="instructions">{recipeDetailFood.strInstructions}</p>
      <video data-testid="video" width="750" height="500" controls>
        <source src={ recipeDetailFood.strYoutube } type="video/mp4" />
        <track src={ recipeDetailFood.strYoutube } kind="captions" />
      </video>
      <Link to="/receitas-feitas">
        <button
          disabled={ buttonDone }
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default FoodInProgress;
