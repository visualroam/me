import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import NavigationBar from "./navigation_top";
import {useDispatch, useSelector} from "react-redux";
import Dashboard from "./dashboard";
import axios from "axios";
import {setLoggedIn} from "../features/reducer"
import {getToken, removeUserSession, setUserSession} from "../features/common";
import Preloader from "./preloader";


const App = (props) => {
    const site = useSelector((state) => state.site)

    const [authLoading, setAuthLoading] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        let token = getToken();
        if (token === undefined || token === "undefined") {
            setTimeout(() => setAuthLoading(false),3000)
            return;
        }

        axios.get(`/verifyToken?token=${token}`).then(response => {
            setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
            dispatch(setLoggedIn({loggedIn: true, token: response.data.token, user: response.data.user}))
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);
    console.log(authLoading)
    if (authLoading) {
        return <Preloader />
    }

    return (
        <>
            <NavigationBar/>
            {site === "home" &&
            <Dashboard/>
            }
        </>
    );
};

export default hot(App);