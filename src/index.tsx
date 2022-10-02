import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {store} from "./redux/Redux-store";
import {Provider} from "react-redux";

// const rerenderEntireTree =(store: StoreType)=>{
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App/>
            </Provider>
        </BrowserRouter>,  document.getElementById('root'))
// };
//
// rerenderEntireTree();

