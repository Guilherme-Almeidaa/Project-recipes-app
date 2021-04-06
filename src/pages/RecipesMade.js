import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import perfilIcon from '../images/profileIcon.svg';
import share from '../images/shareIcon.svg';
import { ZERO, TWO_THOUSAND } from '../services/helpers';

function RecipesMade() {
  const recipesMade = JSON.parse(localStorage.getItem('doneRecipes'));
  const TWO = 2;
  const [copyText, setCopyText] = useState('');
  const [recipesDone, setRecipesDone] = useState(recipesMade);

  const filterRecipes = (type) => {
    if (type === 'all') {
      setRecipesDone(recipesMade);
    } else {
      const recipesFilter = recipesMade.filter((recipe) => recipe.type === type);
      setRecipesDone(recipesFilter);
    }
  };

  const handleCopyClick = (food) => {
    copy(`http://localhost:3000/${food.type}s/${food.id}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), TWO_THOUSAND);
  };

  return (
    <div>
      <header>
        <h1 data-testid="page-title">
          Receitas Feitas
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
      <div>
        <button
          type="button"
          onClick={ () => filterRecipes('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => filterRecipes('comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => filterRecipes('bebida') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {recipesMade ? recipesDone.map((recipe, index) => {
        if (recipe.type === 'comida') {
          return (
            <div key={ index }>
              <Link to={ `/comidas/${recipe.id}` }>
                <img
                  width="200px"
                  data-testid={ `${index}-horizontal-image` }
                  alt="recipe"
                  src={ recipe.image }
                />
              </Link>
              <button
                type="button"
                onClick={ () => handleCopyClick(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share"
                  src={ share }
                />
              </button>
              <p>{copyText}</p>
              <Link
                to={ `/comidas/${recipe.id}` }
              >
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area} - ${recipe.category}`}
              </p>

              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <p>
                {recipe.tags.slice(ZERO, TWO).map((tag, indexTag) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ indexTag }
                  >
                    {tag}
                  </p>))}
              </p>
            </div>

          );
        }
        return (
          <div key={ index }>
            <Link to={ `/bebidas/${recipe.id}` }>
              <img
                width="200px"
                data-testid={ `${index}-horizontal-image` }
                alt="recipe"
                src={ recipe.image }
              />
            </Link>
            <button
              type="button"
              onClick={ () => handleCopyClick(recipe) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                alt="share"
                src={ share }
              />
            </button>
            <p>{copyText}</p>
            <Link to={ `/bebidas/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          </div>
        );
      }) : null}

    </div>

  );
}

export default RecipesMade;
