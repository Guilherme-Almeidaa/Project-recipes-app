import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import DrinkRecipes from './pages/DrinkRecipes';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import FoodIngredient from './pages/FoodIngredient';
import DrinkIngredient from './pages/DrinkIngredient';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinkArea from './pages/DrinkArea';
import FoodArea from './pages/FoodArea';
import DrinkInProgress from './pages/DrinkInProgress';
import FoodInProgress from './pages/FoodInProgress';
import RecipesMade from './pages/RecipesMade';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ FoodRecipes } />
          <Route exact path="/bebidas" component={ DrinkRecipes } />
          <Route exact path="/comidas/:id" component={ FoodDetails } />
          <Route exact path="/bebidas/:id" component={ DrinkDetails } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ FoodIngredient }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ DrinkIngredient }
          />
          <Route exact path="/explorar/comidas/area" component={ FoodArea } />
          <Route exact path="/explorar/bebidas/area" component={ DrinkArea } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/receitas-feitas" component={ RecipesMade } />
          <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
          <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
