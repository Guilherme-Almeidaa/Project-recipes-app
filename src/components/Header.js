import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import perfilIcon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/functions';
import SearchInput from './SearchInput';
import '../style/header.css';

function Header() {
  const { setSearchRender,
    searchRender,
    setFilterSearch,
    filterSearch,
    searchInput,
    setRecipesFilters,

  } = useContext(RecipesContext);

  const { Title } = Typography;

  const stateSearchInput = (stateInput) => {
    setSearchRender(!stateInput);
  };

  const handlerChange = ({ target }) => {
    setFilterSearch(target.value);
  };

  const searchButton = (filter, inputSearch, setFilter) => {
    requestApi(filter, inputSearch, setFilter);
  };

  const history = useHistory();
  const { location } = history;
  const checkLocation = location.pathname;

  return (
    <header>
      <div className="header-title">
        <Link to="/perfil">
          <button className="header-icon" type="button">
            <img
              data-testid="profile-top-btn"
              src={ perfilIcon }
              alt="perfil"
            />
          </button>

        </Link>

        <h1 data-testid="page-title" className="page-title">
          <Title>
            {checkLocation === '/bebidas' ? 'Bebidas' : 'Comidas'}
          </Title>
        </h1>

        <button
          className="header-icon"
          type="button"
          onClick={ () => stateSearchInput(searchRender) }
        >
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="busca"
          />
        </button>
      </div>
      <div className="inputs-checkbox">
        <label className="inputs-select" htmlFor="ingredient">
          <input
            onClick={ handlerChange }
            value="ingredients-input"
            data-testid="ingredient-search-radio"
            name="search"
            type="radio"
            id="ingredient"
          />
          Ingrediente
        </label>
        <label className="inputs-select" htmlFor="name">
          <input
            onClick={ handlerChange }
            value="name-input"
            data-testid="name-search-radio"
            name="search"
            type="radio"
            id="name"
          />
          Nome
        </label>
        <label className="inputs-select" htmlFor="first">
          <input
            onClick={ handlerChange }
            value="first-letter-input"
            data-testid="first-letter-search-radio"
            name="search"
            type="radio"
            id="first"
          />
          Primeira Letra
        </label>
      </div>
      <div className="input-conteiner">
        <Button
          type="primary"
          onClick={ () => searchButton(filterSearch,
            searchInput,
            setRecipesFilters) }
          data-testid="exec-search-btn"
          icon={ <SearchOutlined /> }
          danger
        >
          Buscar
        </Button>
        {searchRender ? <SearchInput /> : null}
      </div>
    </header>
  );
}

export default Header;
