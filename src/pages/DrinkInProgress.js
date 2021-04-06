import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { TWO_THOUSAND, fetchAPI } from '../services/helpers';
import '../style/recipeDetail.css';
import CheckBoxProgress from './CheckBoxProgress';

function DrinkInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  const drinkRecipeId = pathname.split('/')[2];

  const [copyText, setCopyText] = useState('');
  const [favorited, setFavorited] = useState();
  const [buttonDone, setButtonDone] = useState(true);

  const {
    recipeDetailDrink,
    setDrinkRecipeId,
    setRecipeDetailDrink,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const drink = await fetchAPI(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`,
      );
      const recipeDrink = await drink.drinks;
      setRecipeDetailDrink(recipeDrink[0]);
      setDrinkRecipeId(drinkRecipeId);
    };
    getAPI();
  }, [drinkRecipeId, setDrinkRecipeId, setRecipeDetailDrink]);

  useEffect(() => {
    if (!localStorage.favoriteRecipes) localStorage.favoriteRecipes = JSON.stringify([]);
    const favoriteStorage = JSON.parse(localStorage.favoriteRecipes).filter(
      (recipe) => recipe.id === drinkRecipeId,
    );
    if (favoriteStorage.length >= 1) {
      setFavorited(blackHeartIcon);
    } else {
      setFavorited(whiteHeartIcon);
    }
  }, [drinkRecipeId]);

  const handleCopyClick = () => {
    const { href } = window.location;
    const indexStart = 0;
    const recipePath = href.substring(indexStart, href.indexOf('/in-progress'));
    copy(recipePath);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  const handleFavoriteClick = () => {
    if (favorited === whiteHeartIcon) {
      setFavorited(blackHeartIcon);
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage.concat({
        id: recipeDetailDrink.idDrink,
        type: 'bebida',
        area: '',
        category: recipeDetailDrink.strCategory,
        alcoholicOrNot: recipeDetailDrink.strAlcoholic,
        name: recipeDetailDrink.strDrink,
        image: recipeDetailDrink.strDrinkThumb,
      });
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    } else {
      setFavorited(whiteHeartIcon);
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage.filter(
        (recipe) => recipe.id !== drinkRecipeId,
      );
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    }
  };

  const handleButtonDone = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );

    const ingredientsUsed = inProgressRecipes.cocktails[drinkRecipeId];

    const allIngredients = Object.keys(recipeDetailDrink).filter(
      (key) => key.includes('strIngredient')
        && recipeDetailDrink[key] !== ''
        && recipeDetailDrink[key] !== null,
    );

    if (ingredientsUsed.length === allIngredients.length) {
      setButtonDone(false);
    }
  };

  return (
    <div>
      <h1>Receitas em progresso</h1>
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetailDrink.strDrinkThumb }
          alt="drink"
        />
        <h2 data-testid="recipe-title">{recipeDetailDrink.strDrink}</h2>
        <button type="button" onClick={ handleCopyClick }>
          <img data-testid="share-btn" src={ shareIcon } alt="share" />
        </button>
        <button type="button" onClick={ handleFavoriteClick }>
          <img data-testid="favorite-btn" src={ favorited } alt="favorite" />
        </button>
        <p>{copyText}</p>
        <p data-testid="recipe-category">{recipeDetailDrink.strAlcoholic}</p>
        <CheckBoxProgress handleButtonDone={ handleButtonDone } />
        <p data-testid="instructions">{recipeDetailDrink.strInstructions}</p>
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
    </div>
  );
}

export default DrinkInProgress;
