import React, { Component } from 'react';

import NavItem from './NavItem';
import Heading from './Heading';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../global/constants'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >
                {/* Sidebar - Brand */}
                <Link to={`${BASE_URL}/`} className='sidebar-brand d-flex align-items-center justify-content-center'>
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-utensils"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Feedascouts</div>
                </Link>
                    
                <hr className="sidebar-divider my-0" />
                <NavItem title={'Dashboard'} path={'dashboard'} icon={'fas fa-fw fa-tachometer-alt'}/>
                <hr className="sidebar-divider" />
                <Heading title={'FOOD'} />
                <NavItem title={'Receitas'} path={'recipes'} icon={'fas fa-fish'} />
                <NavItem title={'Ementas'} path={'menus'} icon={'fas fa-carrot'}/>

            </ul>
            {/* End of Sidebar */}
            </>
        );
    }
}
 
export default Sidebar;