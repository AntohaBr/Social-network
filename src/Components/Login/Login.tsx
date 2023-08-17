import React, {FC, useState} from 'react'
import {LoginForm} from 'Components/Login'
import {PATH} from 'Constants/Routing-constants'
import {Navigate} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'
import s from './Login.module.scss'

export const Login: FC = () => {
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
                    <h4 className={s.loginPage_test_pane_title}>Test Email and Password</h4>
                    <div className={s.loginPage_test_pane_text}>
                        <div className={s.loginPage_test_block}>
                            <div className={s.loginPage_copy_text_title}>Email:</div>
                            <span className={s.loginPage_copy_text}>free@samuraijs.com</span>
                            <button onClick={onClickCopyEmailHandler}
                                    className={s.loginPage_button_copy}>{copyEmail}</button>
                        </div>
                        <div className={s.loginPage_test_block}>
                            <div className={s.loginPage_copy_text_title}>Password:</div>
                            <span className={s.loginPage_copy_text}>free</span>
                            <button onClick={onClickCopyPasswordHandler}
                                    className={s.loginPage_button_copy}>{copyPassword}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




