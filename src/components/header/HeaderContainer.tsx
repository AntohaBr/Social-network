import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/Redux-store'
import {Header} from './Header'
import {getAuthUserDataTC} from "../../redux/Auth-reducer";



export type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

export type MapStateToPropsType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getAuthUserDataTC: () => void
}


class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        this.props.getAuthUserDataTC()
    }

    render() {
        return (
            <Header{...this.props}/>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {getAuthUserDataTC})(HeaderContainer);