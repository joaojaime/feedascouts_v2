import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RecentRecipes from './RecentRecipes';


class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            <h1>Receitas <i className='fas fa-fish'></i></h1>
            <Jumbotron>
                <h2>Hey!</h2>
                Aqui podes encontrar a lista de receitas existentes ou adicionar uma nova
                <br/><br/>
                <Link to='/recipes/create'>
                    <Button type='button' variant='primary' size='md'>Nova receita</Button>
                </Link>
            </Jumbotron>
            <RecentRecipes />
            </>
        );
    }
}
 
export default Recipes;