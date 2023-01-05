import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Settings from "./components/settings/Settings";
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {Navbar} from "./components/navbar/Navbar";
import {News} from "./components/news/News";
import {Music} from "./components/music/Music";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import {initializeAppTC} from "./redux/App-reducer";
import {AppStateType} from "./redux/Redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {

        if(!this.props. initialized) {
           return  <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    {/*<div className='app-wrapper-content'>*/}
                    <Switch>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                    </Switch>
                    {/*</div>*/}
                </div>
            </BrowserRouter>
        )
    }
}

type MapDispatchToPropsType = {
    initializeAppTC: () => void
}
type PropsType = MapDispatchToPropsType & MapStateToPropsType

type MapStateToPropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeAppTC}),
    withRouter
)(App)