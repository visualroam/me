import {hot} from 'react-hot-loader/root';
import React, {useState, useEffect} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LoginImage from '../assets/login.png'
import '../styles/navigation.scss'
import {Button, Modal} from "react-bootstrap";
import Login from "./login";
import {useDispatch, useSelector} from "react-redux";
import {setSite} from "../features/reducer";



function Item(label, identifier, site, onclick) {

    return (
        <li className={ "Menu-list-item"} key={"menue_" + identifier} onClick={onclick}>
            {label}
            <span className={"Mask " + (site === identifier ? "active" : "")}><span>{label}</span></span>
            <span className={"Mask " + (site === identifier ? "active" : "")}><span>{label}</span></span>
        </li>
    )
}

const NavigationBar = (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const loggedIn = useSelector((state) => state.loggedIn);
    const user = useSelector((state) => state.user);
    const site = useSelector((state) => state.site)
    const dispatch = useDispatch()

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
                        {!loggedIn &&
                            <span className="navigation-head link" onClick={toggleLoginModal}><i className="fa fa-sign-in-alt"></i>LOGIN</span>
                        }
                        {loggedIn &&
                            <span className="navigation-head">{user.name}</span>
                        }
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
                    {[{field: "home", label: "Home", faClass: "fa fa-home"},{field: "url", label: "URL", faClass: "fa fa-link"}].map((e) => {
                        return Item(e["label"], e["field"], site, () => {dispatch(setSite(e["field"]));setShowMenu(false)})
                    })}
                </ul>
            </div>
            }
        </>
    );
};

export default hot(NavigationBar);