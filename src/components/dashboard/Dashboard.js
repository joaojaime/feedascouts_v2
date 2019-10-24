import React, { Component } from 'react';
import * as firebase from 'firebase';
import pios1 from '../../images/pios1.jpg'
import pios2 from '../../images/pios2.jpg'
import food1 from '../../images/food-post.jpg'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <>
            <h1>FeedaScouts</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <img src={food1} alt="Escutismo" 
                    style={{height:'500px'}}   
                ></img>
            </div>
            </>
        );
    }
}
 
export default Dashboard;