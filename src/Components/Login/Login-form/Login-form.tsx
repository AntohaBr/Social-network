import React from 'react'
import {useAppDispatch, useAppSelector, validate} from 'Utils'
import {useFormik} from 'formik'
import {login} from 'Redux/Auth-reducer'
import {LoginDataType} from 'Api/Auth-api'
import {selectCaptchaURL} from 'Store/Selectors'
import s from 'Components/Login/Login-form/Login-form.module.scss'

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const captchaURL = useAppSelector(selectCaptchaURL)

    const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
            validate: validate,
            onSubmit: (values: LoginDataType) => {
                dispatch(login(values))
            }
        },
    )
    return (
        <form onSubmit={formik.handleSubmit} className={s.loginForm_wrapper}>
            <div className={s.loginForm_title_block}>
                <h3 className={s.loginForm_pane_title}>Sing In Your Account</h3>
            </div>
            <div className={s.loginForm_group}>
                <input
                    className={s.loginForm_input}
                    id='email'
                    name='email'
                    type='email'
                    placeholder={'Email'}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ?
                    <div className={s.loginForm_error}>{formik.errors.email}</div> : null}
            </div>
            <div className={s.loginForm_group}>
                <input
                    className={s.loginForm_input}
                    id='password'
                    name='password'
                    type='password'
                    placeholder={'Password'}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ?
                    <div className={s.loginForm_error}>{formik.errors.password}</div> : null}
            </div>
            <div className={s.loginForm_checkbox}>
                <input
                    className={s.loginForm_check}
                    id='rememberMe'
                    name='rememberMe'
                    type='checkbox'
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                />
                <label htmlFor="rememberMe" className={s.loginForm_label}>Remember me</label>
            </div>
            {captchaURL && <img src={captchaURL} alt="captcha"/>}
            <div className={s.loginForm_title_block}>
                <button type="submit" className={s.loginForm_button_login}>Login</button>
            </div>
        </form>
    )
}

