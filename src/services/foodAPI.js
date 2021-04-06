const fetchAPI = (api) => fetch(api).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const getCurrenceRecipesFoodsIngredients = (filter) => {
  const ingredients = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
  return fetchAPI(ingredients);
};

export const getCurrenceRecipesFoodsName = (filter) => {
  const name = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
  return fetchAPI(name);
};

export const getCurrenceRecipesFoodsFirstLetter = (filter) => {
  const firstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`;
  return fetchAPI(firstLetter);
};

export const getCategoryFoods = () => {
  const categoryEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetchAPI(categoryEndPoint);
};

export const getRecipesFoodsByCategory = (filter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  return fetchAPI(endpoint);
};
