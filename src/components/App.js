import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Recipes from './recipes/Recipes';

import DefaultLayout from './default_layout/DefaultLayout';
import history from './../global/history';
import Dashboard from './dashboard/Dashboard';
import Menus from './menus/Menus';

function App() {
  return (
	<Router history={history}>
		<DefaultLayout>
			<Route path="/" exact component={Dashboard} />
			<Route path="/dashboard" exact component={Dashboard} />
			<Route path="/recipes" exact component={Recipes} />
			<Route path="/menus" exact component={Menus} />
		</DefaultLayout>
	</Router>
  );
}

export default App;
