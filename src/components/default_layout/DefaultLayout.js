import React, { Component } from 'react';

import '../../css/sb-admin-2.min.css';
import Sidebar from '../sidebar/Sidebar';
import Topbar from '../topbar/Topbar';
import Footer from '../footer/Footer';
import Wrapper from '../wrappers/Wrapper';
import ContentWrapper from '../wrappers/ContentWrapper';

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Wrapper>
                <Sidebar />
                <ContentWrapper >
                    <Topbar />
                    <div className="container-fluid">
                        {this.props.children}  
                    </div>
                    <Footer />
                </ContentWrapper>
            </Wrapper>
        );
    }
}
 
export default DefaultLayout;