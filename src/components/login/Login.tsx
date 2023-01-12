import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../common/FormsControl/FormsControl'
import {required} from '../../utils/Validators/Validators'
import {connect} from 'react-redux'
import {login} from '../../redux/Auth-reducer'
import {AppStateType} from '../../redux/Redux-store'
import s from '../common/FormsControl/FormsControl.module.css'
import {Redirect} from "react-router-dom";


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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


const LoginReduxForm = reduxForm<FormDataType> ({form: 'login'}) (LoginForm)




type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props:LoginPropsType) => {

    const onSubmit = (formData:FormDataType) => {
       props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return  <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}

const mapStateToProps = (state:AppStateType) => ({
    isAuth: state.auth.isAuth
})

export  default connect(mapStateToProps, {login}) (Login)