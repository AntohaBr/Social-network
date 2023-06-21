import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'
import {LoginForm} from 'Components/Login'

export const Login = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(selectIsAuth)

    if (isAuth) {
        navigate('/Profile')
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    )
}




