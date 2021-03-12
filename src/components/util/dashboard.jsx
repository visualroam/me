import React from 'react';
import {hot} from 'react-hot-loader/root';

import Show01 from '../../assets/header_01.png'
import Show02 from '../../assets/header_02.png'
import Show03 from '../../assets/header_03.png'
import {Carousel} from "react-bootstrap";



const Dashboard = (props) => {
    return (
        <>
            <Carousel className="d-none d-lg-block">
                <Carousel.Item>
                    <img
                        className="w-100 h-100 carousel-image"
                        src={Show01}
                        alt="First slide"
                    />
                    <div className="d-flex align-items-center justify-content-end content">
                        <span className="page-show">Welcome</span>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Show02}
                        alt="Second slide"
                    />
                    <div className="d-flex align-items-center justify-content-end content">
                        <span className="page-show">Projects</span>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Show03}
                        alt="Third slide"
                    />
                    <div className="d-flex align-items-center justify-content-end content">
                        <span className="page-show">Streams</span>
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default hot(Dashboard);