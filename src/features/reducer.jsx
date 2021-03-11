
import {createReducer} from "@reduxjs/toolkit";
import {createAction} from 'redux-actions';
import reduceReducers from 'reduce-reducers';

export const setLoggedIn = createAction("SET_LOGGED_IN");
export const setSite = createAction("SET_SITE");

const actions = createReducer({}, {
    [setLoggedIn]: (state, action) => {
        state.loggedIn = action.payload["loggedIn"];
        state.token = action.payload["token"];
        state.user = action.payload["user"];
    },
    [setSite]: (state,action) => {
        state.site = action.payload;
    }
});

export default reduceReducers({}, actions); 