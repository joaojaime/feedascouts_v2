import React from 'react';
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../global/constants'


const NavItem = (props) => 

    <li className="nav-item">
        <Link to={`${BASE_URL}/${props.path}`} className='nav-link'>
            <i className={`${props.icon}`}></i>
            <span>{props.title}</span>
        </Link>
    </li>

export default NavItem;