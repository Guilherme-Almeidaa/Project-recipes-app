import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  NINE,
  TWENTY_ONE,
  THIRTY_SIX,
  TWENTY_NINE,
  FOURTY_NINE,
  FIFTY_ONE,
} from '../services/helpers';
import RecipesContext from '../context/RecipesContext';
import history from '../history/history';
import '../App.css';

// informações da tela
const { pathname } = history.location;
const DrinkOrFood = pathname.includes('bebidas') ? 'cocktails' : 'meals';

const toggleCheckboxChange = (e, recipe, index) => {
  const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const idRecipe = Object.values(recipe)[0];
  const targetIngredient = [index];
  const savedIngredients = progress[DrinkOrFood][idRecipe];
  const concat = (...arrays) => [].concat(...arrays.filter(Array.isArray));
  const newIndredients = concat(savedIngredients, targetIngredient);
  const newProgress = {
    ...progress,
    [DrinkOrFood]: {
      [idRecipe]: newIndredients,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
  console.log(newProgress);
};

const handleChecked = (recipe, index) => {
  const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const idRecipe = Object.values(recipe)[0];

  return progress[DrinkOrFood][idRecipe]
    && progress[DrinkOrFood][idRecipe].includes(index)
    ? true
    : null;
};

function CheckBoxProgress(props) {
  const { recipeDetailDrink, recipeDetailFood } = useContext(RecipesContext);

  useEffect(() => {
    const startProgress = {
      cocktails: {},
      meals: {},
    };

    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!progress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(startProgress));
    }
  }, []);

  const handleIngredientsInProgress = (recipe, initial, middle, end) => {
    const ingredients = Object.values(recipe).slice(initial, middle);
    const measures = Object.values(recipe).slice(middle, end);
    return ingredients
      .filter((recipes) => recipes !== null && recipes !== '')
      .map((ingredient, index) => (
        <div
          data-testid={ `${index}-ingredient-step` }
          key={ `${index}-ingredient` }
        >
          <input
            onChange={ (e) => {
              toggleCheckboxChange(e, recipe, index);
              props.handleButtonDone();
            } }
            type="checkbox"
            id={ `${index}-ingredient` }
            checked={ handleChecked(recipe, index) }
          />
          {' '}
          <label htmlFor={ `${index}-ingredient` } key={ index }>
            {`${ingredient} - ${measures[index]}`}
            {' '}
          </label>
        </div>
      ));
  };

  return (
    <div>
      {pathname.includes('bebidas')
        ? handleIngredientsInProgress(
          recipeDetailDrink,
          TWENTY_ONE,
          THIRTY_SIX,
          FIFTY_ONE,
        )
        : handleIngredientsInProgress(
          recipeDetailFood,
          NINE,
          TWENTY_NINE,
          FOURTY_NINE,
        )}
    </div>
  );
}

CheckBoxProgress.propTypes = {
  handleButtonDone: PropTypes.func.isRequired,
};

export default CheckBoxProgress;
