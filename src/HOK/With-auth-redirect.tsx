import React, {ComponentType} from 'react'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../Redux/Redux-store'
import {connect} from 'react-redux'


type mapStateToPropsTypeForRedirect = {
    isAuth: boolean
}


const mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsTypeForRedirect => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component:ComponentType) => {
    const  RedirectComponent = (props: mapStateToPropsTypeForRedirect) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/Login'}/>
        return <Component {...restProps}/>
    }
    const ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedRedirectComponent
}
