import {
  getCurrenceRecipesFoodsFirstLetter,
  getCurrenceRecipesFoodsIngredients,
  getCurrenceRecipesFoodsName,
} from './foodAPI';
import {
  getCurrenceRecipesDrinksFirstLetter,
  getCurrenceRecipesDrinksIngredients,
  getCurrenceRecipesDrinksName,
} from './drinkAPI';
import history from '../history/history';

const showAlert = () => alert('Sua busca deve conter somente 1 (um) caracter');
const requestApi = (filterSearch, searchInput, setRecipesFilters) => {
  if (history.location.pathname === '/bebidas') {
    if (filterSearch === 'ingredients-input') {
      getCurrenceRecipesDrinksIngredients(searchInput)
        .then((response) => setRecipesFilters(response.drinks));
    } else if (filterSearch === 'name-input') {
      getCurrenceRecipesDrinksName(searchInput)
        .then((response) => setRecipesFilters(response.drinks));
    } else if (filterSearch === 'first-letter-input') {
      if (searchInput.length > 1) {
        showAlert();
      } else {
        getCurrenceRecipesDrinksFirstLetter(searchInput)
          .then((response) => setRecipesFilters(response.drinks));
      }
    }
  } else if (filterSearch === 'ingredients-input') {
    getCurrenceRecipesFoodsIngredients(searchInput)
      .then((response) => setRecipesFilters(response.meals));
  } else if (filterSearch === 'name-input') {
    getCurrenceRecipesFoodsName(searchInput)
      .then((response) => setRecipesFilters(response.meals));
  } else if (filterSearch === 'first-letter-input') {
    if (searchInput.length > 1) {
      showAlert();
    } else {
      getCurrenceRecipesFoodsFirstLetter(searchInput)
        .then((response) => setRecipesFilters(response.meals));
    }
  }
};

export default requestApi;
