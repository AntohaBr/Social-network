import React from 'react'
import {connect} from "react-redux"
import {authAPI, AuthMeDataType} from "../../api/api"
import {setAuthUserDataAC} from "../../redux/Auth-Reducer"
import {AppStateType} from "../../redux/Redux-store"
import {Header} from "./Header"


export type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

export type MapStateToPropsType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    setAuthUserDataAC: (data: AuthMeDataType) => void
}


class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    // let {id, email, login} = res.data.data
                    this.props.setAuthUserDataAC(res.data.data)
                }
            })
    }

    render() {
        return (
            <Header{...this.props}/>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
    id: state.auth.id
})


export default connect(mapStateToProps, {setAuthUserDataAC})(HeaderContainer);