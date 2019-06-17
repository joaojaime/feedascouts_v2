import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Recipes from './recipes/Recipes';

import DefaultLayout from './default_layout/DefaultLayout';
import history from './../global/history';
import Dashboard from './dashboard/Dashboard';
import Menus from './menus/Menus';
import CreateEditRecipe from './recipes/CreateEditRecipe';
import CreateMenu from './menus/CreateMenu';
import EditMenu from './menus/EditMenu';

function App() {
  return (
	<Router history={history}>
		<DefaultLayout>
			<Route path="/" exact component={Dashboard} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/recipes" exact component={Recipes} />
			<Route path="/recipes/create" exact component={CreateEditRecipe} />
			<Route path="/recipes/:id/edit" exact component={CreateEditRecipe} />
			<Route path="/menus" exact component={Menus} />
			<Route path="/menus/create" exact component={CreateMenu} />
			<Route path='/menus/:id/edit' exact component={EditMenu} />
		</DefaultLayout>
	</Router>
  );
}

export default App;
