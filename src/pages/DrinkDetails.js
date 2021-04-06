import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Carousel } from 'antd';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI, handleIngredients,
  TWO_THOUSAND, SIX } from '../services/helpers';
import '../style/recipeDetail.css';

function DrinkDetails() {
  const [recipeDetailDrink, setRecipeDetailDrink] = useState({});
  const [buttonClassName, setButtonClassName] = useState('fixedbutton');
  const [buttonText] = useState('Iniciar Receita');
  const [recommendation, setRecommendation] = useState(['']);
  const [copyText, setCopyText] = useState('');
  const [favorited, setFavorited] = useState();
  // src: https://reactrouter.com/web/api/Hooks
  const history = useHistory();
  const { pathname } = history.location;
  const drinkRecipeId = pathname.split('/')[2];

  const {
    setDrinkRecipeId,
    setMealRecipeId,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const drink = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`);
      const recipeDrink = await drink.drinks;
      setRecipeDetailDrink(recipeDrink[0]);
      setDrinkRecipeId(drinkRecipeId);
    };
    getAPI();
  }, [drinkRecipeId, setDrinkRecipeId, setRecipeDetailDrink]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const foods = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const foodsData = await foods.meals;
      setRecommendation(foodsData);
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
      .filter((recipe) => recipe.id === drinkRecipeId);
    if (favoriteStorage.length >= 1) {
      setFavorited(blackHeartIcon);
    } else {
      setFavorited(whiteHeartIcon);
    }
  }, [drinkRecipeId]);

  useEffect(() => {
    if (!localStorage.doneRecipes) localStorage.doneRecipes = JSON.stringify([]);
    const doneStorage = JSON.parse(localStorage.doneRecipes)
      .filter((recipe) => recipe.id === drinkRecipeId);
    if (doneStorage.length >= 1) {
      setButtonClassName('fixedbutton hidden');
    } else {
      setButtonClassName('fixedbutton');
    }
  }, [drinkRecipeId]);

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
      const newFavoriteStorage = favoriteStorage
        .filter((recipe) => recipe.id !== drinkRecipeId);
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
    }
  };

  return (
    <div>
      <div className="container-img">
        <img
          data-testid="recipe-photo"
          className="img-recipe"
          src={ recipeDetailDrink.strDrinkThumb }
          alt="drink"
        />
      </div>
      <h2 data-testid="recipe-title">{recipeDetailDrink.strDrink}</h2>
      <button type="button" onClick={ handleCopyClick }>
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button type="button" onClick={ handleFavoriteClick }>
        <img data-testid="favorite-btn" src={ favorited } alt="favorite" />
      </button>
      <p>{copyText}</p>
      <p data-testid="recipe-category">{recipeDetailDrink.strAlcoholic}</p>
      <ul>
        {handleIngredients(recipeDetailDrink)}
      </ul>
      <p data-testid="instructions">{recipeDetailDrink.strInstructions}</p>
      <Carousel>
        {
          recommendation && recommendation.length && recommendation
            .filter((_, indexs) => indexs < SIX)
            .map((meals, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key="index"
                className="container-recomend"
              >
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {meals.strMeal}
                </p>
                <Link
                  onClick={ () => setMealRecipeId(meals.idMeal) }
                  to={ `/comidas/${meals.idMeal}` }
                  className="container-img"
                >
                  <img
                    className="img-recipe"
                    data-testid={ `${index}-card-img` }
                    src={ meals.strMealThumb }
                    alt={ meals.strMeal }
                  />
                </Link>
              </div>
            ))
        }
      </Carousel>
      <Link to={ `/bebidas/${drinkRecipeId}/in-progress` }>
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

export default DrinkDetails;
