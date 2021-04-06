const fetchAPI = (api) => fetch(api).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCurrenceRecipesDrinksIngredients = (filter) => {
  const ingredients = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`;
  return fetchAPI(ingredients);
};

export const getCurrenceRecipesDrinksName = (filter) => {
  const name = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;
  return fetchAPI(name);
};

export const getCurrenceRecipesDrinksFirstLetter = (filter) => {
  const firstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`;
  return fetchAPI(firstLetter);
};

export const getCategoryDrinks = () => {
  const categoryEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return fetchAPI(categoryEndPoint);
};

export const getRecipesDrinksByCategory = (filter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  return fetchAPI(endpoint);
};
