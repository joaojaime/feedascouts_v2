import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; João Jaime 2019</span>
                </div>
                </div>
            </footer>
        );
    }
}
 
export default Footer;