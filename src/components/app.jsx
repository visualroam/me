import React from 'react';
import { hot } from 'react-hot-loader/root';
import NavigationBar from "./navigation_top";
import {useSelector} from "react-redux";
import Dashboard from "./dashboard";



const App = (props) => {
    const site = useSelector((state) => state.site)

    return (
        <>
            <NavigationBar />
            {site === "home" &&
                <Dashboard />
            }
        </>
    );
};

export default hot(App);