import React, {ComponentType} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppStateType} from 'Store/Store'
import {connect} from 'react-redux'


type mapStateToPropsTypeForRedirect = {
    isAuth: boolean
}


const mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsTypeForRedirect => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component: ComponentType) => {
    const RedirectComponent = (props: mapStateToPropsTypeForRedirect) => {
        const navigate = useNavigate()

        let {isAuth, ...restProps} = props
        if (!isAuth) {
            navigate('/Login')
        }
        // return <Component {...restProps}/>
    }
    // const ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    // return ConnectedRedirectComponent
}
