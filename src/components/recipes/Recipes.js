import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import CreateRecipe from './CreateRecipe';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <CreateRecipe />
        );
    }
}
 
export default Recipes;