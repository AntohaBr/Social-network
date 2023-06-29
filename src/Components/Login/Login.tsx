import React, {useState} from 'react'
import {LoginForm} from 'Components/Login'
import {PATH} from 'Constants/Routing-constants'
import {Navigate} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'
import s from './Login.module.scss'

export const Login = () => {
    const isAuth = useAppSelector(selectIsAuth)

    const [copyEmail, setCotyEmail] = useState('Copy')
    const [copyPassword, setCopyPassword] = useState('Copy')

    const onClickCopyEmailHandler = () => {
        setCotyEmail('Copied')
        navigator.clipboard.writeText('free@samuraijs.com')
    }

    const onClickCopyPasswordHandler = () => {
    setCopyPassword('Copied')
        navigator.clipboard.writeText('free')
    }

    if (isAuth) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={s.loginPage_wrapper}>
            <div className={s.loginPage_pane}>
                <LoginForm/>
                <div className={s.loginPage_test_pane}>
                    <h4>Test Email and Password</h4>
                    <div>
                        <span>Email:</span>
                        <span>free@samuraijs.com</span>
                        <button onClick={onClickCopyEmailHandler}>{copyEmail}</button>
                    </div>
                    <div>
                        <span>Password:</span>
                        <span>free</span>
                        <button onClick={onClickCopyPasswordHandler}>{copyPassword}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}




