import React from 'react'
import {LoginForm} from 'Components/Login'
import {PATH} from 'Constants/Routing-constants'
import {Navigate, useNavigate} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'

export const Login = () => {
    const isAuth = useAppSelector(selectIsAuth)

    if (isAuth) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}




