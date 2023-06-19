import React from 'react'
import {useAppDispatch, useAppSelector, validate} from 'Utils'
import {useFormik} from 'formik'
import {login} from 'Redux/Auth-reducer'
import {LoginDataType} from 'Api/Auth-api'
import {selectCaptchaURL} from 'Store/Selectors'

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
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div>
                    <label htmlFor='Email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='Password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </div>
            </div>
            <div>
                <label htmlFor="rememberMe">Remember me</label>
                <input
                    id='rememberMe'
                    name='rememberMe'
                    type='checkbox'
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                />
            </div>
            {captchaURL && <img src={captchaURL} alt="captcha"/>}
            <button type="submit">Login</button>
        </form>
    )
}

