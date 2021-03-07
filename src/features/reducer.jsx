
import {createReducer} from "@reduxjs/toolkit";
import {createAction} from 'redux-actions';
import reduceReducers from 'reduce-reducers';

const actions = createReducer({}, {
});

export default reduceReducers({}, actions); 