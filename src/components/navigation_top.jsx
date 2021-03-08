import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../styles/navigation.scss'

function Item(label, identifier) {
    return(
        <li className="Menu-list-item" key={"menue_" + identifier}>
            {label}
            <span className="Mask"><span>{label}</span></span>
            <span className="Mask"><span>{label}</span></span>
        </li>
    )
}

const NavigationBar = (props) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className="container-fluid navigation">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                    <span className="navigation-head link" onClick={()=> {
                        setShowMenu(!showMenu);
                    }}><i className="fa fa-bars mr-2"></i>MENU</span>
                    </div>
                </div>
            </div>
            { showMenu &&
                <div className="Menu">
                    <span className="navigation-head" id="closeMenu" style={{marginRight: "15px"}} onClick={() => {
                        setShowMenu(!showMenu);
                    }}><i className="fa fa-times mr-2"></i>CLOSE</span>
                    <ul className="Menu-list" data-offset="10">
                        {[{field: "home", label: "Home", faClass: "fa fa-home"}].map((e) => {
                            return Item(e["label"], e["field"], e["faClass"])
                        })}
                    </ul>
                </div>
            }
        </>
    );
};

export default hot(NavigationBar);