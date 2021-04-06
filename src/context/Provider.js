import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const showAlertNotFound = () => alert(messageAlert);
  const [searchRender, setSearchRender] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [recipesFilters, setRecipesFilters] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [getSearchBtn, setSearchBtn] = useState(false);
  const [mealRecipeId, setMealRecipeId] = useState('');
  const [drinkRecipeId, setDrinkRecipeId] = useState('');
  const [recipeDetailFood, setRecipeDetailFood] = useState({});
  const [recipeDetailDrink, setRecipeDetailDrink] = useState({});
  const [btnFilter, setBtnFilter] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState();

  const checkRecipe = () => {
    if (recipesFilters === null) {
      showAlertNotFound();
    }
  };

  useEffect(
    checkRecipe,
    [recipesFilters],
  );

  const context = {
    mealRecipeId,
    drinkRecipeId,
    recipeDetailFood,
    recipeDetailDrink,
    filterSearch,
    searchRender,
    searchInput,
    getSearchBtn,
    recipesFilters,
    btnFilter,
    initialRecipes,
    setRecipesFilters,
    setSearchBtn,
    setSearchInput,
    setFilterSearch,
    setSearchRender,
    setMealRecipeId,
    setDrinkRecipeId,
    setRecipeDetailFood,
    setRecipeDetailDrink,
    setBtnFilter,
    setInitialRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
