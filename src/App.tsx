import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route,Switch } from "react-router-dom";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {DialogsContainer} from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
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
    );
}

export default App;