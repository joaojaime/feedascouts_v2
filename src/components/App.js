import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Recipes from './recipes/Recipes';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import DefaultLayout from './default_layout/DefaultLayout';
import history from './../global/history';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
		<>
			<Navbar expand="lg" variant="dark" bg="dark">
				<Navbar.Brand href="">feedascouts</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="recipes">Receitas</Nav.Link>
					<Nav.Link href="menus">Ementas</Nav.Link>
				</Nav>
			</Navbar>

			<Router history={history}>
				<DefaultLayout>
					<Route path="/" exact component={Dashboard} />
					<Route path="/recipes" exact component={Recipes} />
				</DefaultLayout>
			</Router>
		</>
		// <Home />
  );
}

export default App;
