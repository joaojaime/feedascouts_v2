import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Criar receita</Button>
                </p>
            </Jumbotron>
        );
    }
}
 
export default Recipes;