import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './features/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import "./styles/main.scss"
import App from "./components/app";


let initialState = {
    site: "home",
    loggedIn: false,
    user: "",
    token: ""
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, 
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

module.hot.accept(); // <-- this one.