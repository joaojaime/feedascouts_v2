import React, { Component } from 'react';
import * as firebase from 'firebase';
import pios1 from '../../images/pios1.jpg'
import pios2 from '../../images/pios2.jpg'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <>
            <h1>FEEDASCOUTS</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <img src={pios2} alt="Escutismo" 
                    className='h-100 w-100'    
                ></img>
            </div>
            </>
        );
    }
}
 
export default Dashboard;