import React from 'react'
import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Settings} from './Components/Settings/Settings'
import UsersContainer from './Components/Users/Users-container'
import HeaderContainer from './Components/Header/Header-container'
import {Navbar} from './Components/Navbar/Navbar'
import {News} from './Components/News/News'
import {Music} from './Components/Music/Music'
import DialogsContainer from './Components/Dialogs/Dialogs-container'
import ProfileContainer from './Components/Profile/Profile-container'
import Login from './Components/Login/Login'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router'
import {initializeApp} from './Redux/App-reducer'
import {AppStateType, store} from './Redux/Redux-store'
import {Preloader} from './Components/Common/Preloader/Preloader'


class App extends React.Component<PropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            console.log('false ', this.props.id)
            return <Preloader/>
        } else {
            console.log('true ', this.props.id)
            return (
                <BrowserRouter>
                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <Navbar/>
                        <div className="app-wrapper-content">
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to={'/Profile'}/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/users' render={() => <UsersContainer/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            )
        }
    }
}


type MapDispatchToPropsType = {
    initializeApp: () => void
}
type PropsType = MapDispatchToPropsType & MapStateToPropsType

type MapStateToPropsType = {
    initialized: boolean
    id: number | null
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized,
        id: state.auth.id
    }
}


const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)


export const ProjectApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
