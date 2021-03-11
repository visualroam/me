import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {ProgressBar} from "react-bootstrap";

const Preloader = (props) => {

    let [progress, setProgress] = useState(0)

    useEffect(() => {
        if(progress < 100) setTimeout(() => setProgress(progress+1),15)
    });

    return (
        <div className="pre-loader">
            <div className="pre-loader-text">
                <span>l</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <ProgressBar now={progress}/>
            </div>
        </div>
    );
};

export default hot(Preloader);