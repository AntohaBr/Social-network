import React from 'react'
import {LoginForm} from 'Components/Login'
import {PATH} from 'Constants/Routing-constants'
import {Navigate} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'
import s from './Login.module.scss'

export const Login = () => {
    const isAuth = useAppSelector(selectIsAuth)

    if (isAuth) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={s.loginPage_wrapper}>
            <LoginForm/>
        </div>
    )
}




