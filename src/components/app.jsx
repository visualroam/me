import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import NavigationBar from "./util/navigation_top";
import {useDispatch, useSelector} from "react-redux";
import Dashboard from "./util/dashboard";
import axios from "axios";
import {setLoggedIn} from "../features/reducer"
import {getToken, removeUserSession, setUserSession} from "../features/common";
import Preloader from "./util/preloader";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NoMatch from "./util/no_match";
import Urls from "./urls/urls";

const App = (props) => {
    const site = useSelector((state) => state.site)

    const [authLoading, setAuthLoading] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        let token = getToken();

        axios.get(`/verifyToken?token=${token}`).then(response => {
            dispatch(setLoggedIn({loggedIn: true, token: response.data.token, user: response.data.user}))
            setTimeout(() => setAuthLoading(false), 3000)
        }).catch(error => {
            setTimeout(() => setAuthLoading(false), 3000)
            removeUserSession();
        });
    }, []);

    if (authLoading) {
        return <Preloader/>
    }

    return (
        <>
            <NavigationBar/>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Dashboard/>
                        )}/>
                    <Route
                        exact
                        path="/urls"
                        render={() => (
                            <Urls />
                        )}
                    />
                    <Route path="*">
                        <NoMatch />
                      </Route>
                </Switch>
        </>
    );
};

export default hot(App);