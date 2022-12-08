import React from 'react';
import './App.css';
import {BrowserRouter, Route,Switch } from "react-router-dom";
import Settings from "./components/settings/Settings";
import {DialogsContainer} from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {Navbar} from "./components/navbar/Navbar";
import {News} from "./components/news/News";
import {Music} from "./components/music/Music";


export const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                {/*<div className='app-wrapper-content'>*/}
                <Switch>
                    <Route path="/dialogs" render={()=><DialogsContainer/>}/>
                    <Route path="/profile/:userId?" render={()=><ProfileContainer/>}/>
                    <Route path="/users" render={()=><UsersContainer/>}/>
                    <Route path="/news" render={()=><News/>}/>
                    <Route path="/music" render={()=><Music/>}/>
                    <Route path="/settings" render={()=><Settings/>}/>
                </Switch>
                {/*</div>*/}
            </div>
        </BrowserRouter>
    )
}
