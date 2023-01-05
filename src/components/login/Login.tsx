import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/Validators/Validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/Redux-store";


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form  onSubmit={props.handleSubmit}>
            <div>
                <Field  placeholder={'Email'} name={'email'} component={Input}  validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType> ({form: 'login'}) (LoginForm)






type LoginPropsType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props:LoginPropsType) => {

    const onSubmit = (formData:FormDataType) => {
       props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        // return  <Redirect to={'/profile'}/>
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

export default connect(mapStateToProps, {loginTC}) (Login)