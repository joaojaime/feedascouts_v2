import React from 'react';

const ContentWrapper = (props) => 
    <div id="content-wrapper" className="d-flex flex-column" >
        <div id="content">
            {props.children}
        </div>
    </div>

export default ContentWrapper;