import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../style/recipes.css';

function SearchInput() {
  const { setSearchInput } = useContext(RecipesContext);
  const handlerChange = ({ target }) => {
    setSearchInput(target.value);
  };
  return (
    <input
      className="input-search"
      onChange={ handlerChange }
      data-testid="search-input"
      type="text"
    />
  );
}

export default SearchInput;
