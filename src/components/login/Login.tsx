import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/Validators/Validators";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form  onSubmit={props.handleSubmit}>
            <div>
                <Field  placeholder={'Login'} name={'login'} component={Input}  validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]}/>
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


export const Login = () => {

    const onSubmit = (value:FormDataType) => {
        console.log(value)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}