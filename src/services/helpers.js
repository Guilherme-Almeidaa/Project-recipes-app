import React from 'react';

export const fetchAPI = async (URL) => {
  const API = await fetch(URL);
  const data = await API.json();
  return data;
};

const handleNull = (measure) => {
  if (measure === null) {
    return '';
  }
  return `- ${measure}`;
};

export const handleIngredients = (recipe) => {
  const ingredients = Object.entries(recipe)
    .filter((key) => (key[1] === null ? false : key[0].includes('strIngredient')));
  const measures = Object.entries(recipe)
    .filter((key) => (key[0].includes('strMeasure')));
  return ingredients
    .filter((recipes) => recipes[1] !== '')
    .map((ingredient, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        { `${ingredient[1]} ${handleNull(measures[index][1])}` }
      </li>
    ));
};

export const ZERO = 0;
export const SIX = 6;
export const NINE = 9;
export const TWELVE = 12;
export const TWENTY_NINE = 29;
export const FOURTY_NINE = 49;
export const THIRTY_SIX = 36;
export const TWENTY_ONE = 21;
export const FIFTY_ONE = 51;
export const TWO_THOUSAND = 2000;
