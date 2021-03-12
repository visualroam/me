import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {ProgressBar} from "react-bootstrap";
import {Link} from "react-router-dom";

const NoMatch = (props) => {

    return (
        <div className="no-match">
            <div className="no-match-text">
                <span className="head">404</span>
                <span className="text">Not found maybe try <Link to="/">here</Link></span>
            </div>
        </div>
    );
};

export default hot(NoMatch);