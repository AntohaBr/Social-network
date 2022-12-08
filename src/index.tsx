import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/Redux-store";
import {Provider} from "react-redux";
import {App} from "./App";

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

