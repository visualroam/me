import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NavigationBar = (props) => {

    return (
        <div className="container-fluid navigation">
            <div className="col-12 d-flex align-items-center justify-content-end">
                <span className="navigation-link active">HOME</span>
                <span className="navigation-link">URLs</span>
            </div>
        </div>
    );
};

export default hot(NavigationBar);