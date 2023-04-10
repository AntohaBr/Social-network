import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../Common/Forms-control/Forms-control'
import {required} from 'Utils/Validators/Validators'
import {connect} from 'react-redux'
import {login} from 'Redux/Auth-reducer'
import {AppStateType} from 'Redux/Redux-store'
import s from '../Common/Forms-control/Forms-control.module.css'
import {Redirect} from 'react-router-dom'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captchaURL: null | string
    captcha: null | string
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props:any) => {
    return (
        <form  action='' onSubmit={props.handleSubmit}>
            <div>
                {createField('Email', 'email', [required], Input)}
            </div>
            <div>
                {createField('Password', 'password', [required], Input, {type: 'password'})}
            </div>
            <div>
                {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}
            </div>
            {props.captchaURL && <img src={props.captchaURL} alt="captcha"/>}
            {props.captchaURL && createField('Symbols from image', 'captcha', [required], Input)}
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<any, any> ({form: 'login'}) (LoginForm)



type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaURL: null | string) => void
    isAuth: boolean
    captchaURL: null | string
}

const Login = (props:LoginPropsType) => {
    const onSubmit = (formData:FormDataType) => {
       props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return  <Redirect to={'/Profile'}/>
    }
    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div>
    )
}

const mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export  default connect(mapStateToProps, {login}) (Login)