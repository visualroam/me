import {hot} from 'react-hot-loader/root';
import React, {useState, useEffect} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LoginImage from '../assets/login.png'
import '../styles/navigation.scss'
import {Button, Modal} from "react-bootstrap";
import Login from "./login";

function Item(label, identifier) {
    return (
        <li className="Menu-list-item" key={"menue_" + identifier}>
            {label}
            <span className="Mask"><span>{label}</span></span>
            <span className="Mask"><span>{label}</span></span>
        </li>
    )
}

const NavigationBar = (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    function toogleModal() {
        let body = document.body
        if (showMenu === false) body.classList.add("no-scroll");
        if (showMenu === true) body.classList.remove("no-scroll");
        setShowMenu(!showMenu);
    }

    function toggleLoginModal() {
        let body = document.body
        if (showLoginForm === false) body.classList.add("no-scroll");
        if (showLoginForm === true) body.classList.remove("no-scroll");
        setShowLoginForm(!showLoginForm);
    }

    return (
        <>
            <div className="container-fluid navigation">
                <div className="row">
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <span className="navigation-head link" onClick={toggleLoginModal}><i className="fa fa-sign-in-alt"></i>LOGIN</span>
                        <span className="navigation-head link" onClick={toogleModal}><i className="fa fa-bars mr-2"></i>MENU</span>
                    </div>
                </div>
            </div>
            {showLoginForm &&
                <Login toggleLoginForm={toggleLoginModal}/>
            }
            {showMenu &&
            <div className="Menu">
                <span className="navigation-head" id="closeMenu" style={{marginRight: "15px"}} onClick={toogleModal}><i
                    className="fa fa-times mr-2"></i>CLOSE</span>
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