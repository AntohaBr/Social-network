import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import {BrowserRouter, Route,Switch } from "react-router-dom";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {UsersContainer} from "./components/users/UsersContainer";
import {DialogsContainer} from "./components/dialogs/DialogsContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                {/*<div className='app-wrapper-content'>*/}
                <Switch>
                    <Route path="/dialogs" render={()=><DialogsContainer/>}/>
                    <Route path="/profile" render={()=><Profile/>}/>
                    <Route path="/users" render={()=><UsersContainer/>}/>
                    <Route path="/news" render={()=><News/>}/>
                    <Route path="/music" render={()=><Music/>}/>
                    <Route path="/settings" render={()=><Settings/>}/>
                </Switch>
                {/*</div>*/}
            </div>
        </BrowserRouter>
    );
}

export default App;