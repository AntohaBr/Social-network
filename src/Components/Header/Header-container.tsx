import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../Redux/Redux-store'
import {Header} from './Header'
import {logOut} from '../../Redux/Auth-reducer'
import {RouteComponentProps, withRouter} from 'react-router'
import {compose} from 'redux'


class HeaderContainer extends React.Component<PropsType> {

    render() {
        return <Header {...this.props}/>;
    }
}


interface Promise {
    email: string
    login: string
    id: string
}


interface MapStateToPropsType {
    login: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logOut: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<Promise>

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {logOut}),
    withRouter
)(HeaderContainer)