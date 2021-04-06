import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Switch } from 'antd';
import {
  getCategoryDrinks,
  getRecipesDrinksByCategory,
} from '../services/drinkAPI';
import {
  getCategoryFoods,
  getRecipesFoodsByCategory,
} from '../services/foodAPI';
import RecipesContext from '../context/RecipesContext';
import '../style/category.css';

function Category() {
  const {
    setRecipesFilters,
    btnFilter,
    setBtnFilter,
    initialRecipes,
  } = useContext(RecipesContext);

  const [categorys, setCategorys] = useState([]);
  const [filterSelected, setFilterSelected] = useState('');

  const history = useHistory();
  const checkLocation = history.location.pathname;

  useEffect(() => {
    const firstRecipe = 0;
    const lastRecipe = 5;
    if (checkLocation === '/bebidas') {
      getCategoryDrinks().then((response) => setCategorys(response.drinks
        .slice(firstRecipe, lastRecipe)));
    }
    if (checkLocation === '/comidas') {
      getCategoryFoods().then((response) => setCategorys(response.meals
        .slice(firstRecipe, lastRecipe)));
    }
  }, []);

  const handleFilter = (filter) => {
    if (filter === 'Goat') {
      setBtnFilter(!btnFilter);
    }

    if (filterSelected === filter) {
      setRecipesFilters(initialRecipes);
      setFilterSelected('');
    }

    if (filterSelected === '' || filterSelected !== filter) {
      const firstRecipe = 0;
      const lastRecipe = 12;
      setFilterSelected(filter);

      if (checkLocation === '/bebidas') {
        getRecipesDrinksByCategory(filter)
          .then((response) => setRecipesFilters(response.drinks
            .slice(firstRecipe, lastRecipe)));
      }
      if (checkLocation === '/comidas') {
        getRecipesFoodsByCategory(filter)
          .then((response) => setRecipesFilters(response.meals
            .slice(firstRecipe, lastRecipe)));
      }
    }
  };

  const handleAll = () => {
    setRecipesFilters(initialRecipes);
    setFilterSelected('');
  };

  return (
    <div className="container-category">
      {categorys.map((category) => {
        const name = category.strCategory;
        const dataTestId = `${name}-category-filter`;
        return (
          <div key={ name }>

            <Switch
              data-testid={ dataTestId }
              type="button"
              onClick={ () => handleFilter(name) }
            />
            {name}
          </div>
        );
      })}
      <div>

        <Switch
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleAll() }
        />
        All
      </div>
    </div>
  );
}

export default Category;
