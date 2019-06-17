import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RecentMenus from './RecentMenus';


class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            <h1>Ementas <i className='fas fa-carrot'></i></h1>
            <Jumbotron>
                <h2>Mekie!</h2>
                Aqui estão as últimas ementas editadas e podes começar tu uma nova
                <br/><br/>
                <Link to='/menus/create'>
                    <Button type='button' variant='primary' size='md'>Nova ementa</Button>
                </Link>
            </Jumbotron>
            <RecentMenus />
            </>
        );
    }
}
 
export default Menus;