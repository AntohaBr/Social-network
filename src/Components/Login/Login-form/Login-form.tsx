import React, {useState, MouseEvent, FC, memo} from 'react'
import {useAppDispatch, useAppSelector, validate} from 'Utils'
import {useFormik} from 'formik'
import {login} from 'Redux/Auth-reducer'
import {LoginDataType} from 'Api/Auth-api'
import {selectCaptcha} from 'Store/Selectors'
import s from 'Components/Login/Login-form/Login-form.module.scss'
import {Eye, EyeSlash} from 'Common'

interface state {
    password: string;
    showPassword: boolean;
}

export const LoginForm: FC = memo(() => {
        const dispatch = useAppDispatch()
        const captchaUrl = useAppSelector(selectCaptcha)


        const [showPassword, setShowPassword] = useState<state>({
            password: '',
            showPassword: false,
        })

        const onClickHandlerShowPassword = () => {
            setShowPassword({...showPassword, showPassword: !showPassword.showPassword});
        }

        const onMouseDownHandler = (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        }

        const formik = useFormik({
                initialValues: {
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: '',
                },
                validate: validate,
                onSubmit: (values: LoginDataType) => {
                    dispatch(login(values))
                }
            },
        )
        return (
            <form onSubmit={formik.handleSubmit}>
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
                        placeholder={'Password'}
                        onChange={formik.handleChange}
                        type={!showPassword.showPassword ? 'password' : 'text'}
                        value={formik.values.password}
                    />
                    <button type='button' onClick={onClickHandlerShowPassword} onMouseDown={onMouseDownHandler}
                            className={s.loginForm_button_eye}>
                        {!showPassword.showPassword ? <EyeSlash/> : <Eye/>}
                    </button>
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
                {captchaUrl &&
                    <div className={s.loginForm_captcha_block}>
                        <img src={captchaUrl} alt="captcha" className={s.loginForm_captcha_img}/>
                        <input
                            className={s.loginForm_captcha_input}
                            id='Symbols from image'
                            name='captcha'
                            onChange={formik.handleChange}
                            value={formik.values.captcha}
                        />
                    </div>
                }
                <div className={s.loginForm_title_block}>
                    <button type="submit" className={s.loginForm_button_login}>Login</button>
                </div>
            </form>
        )
    }
)
