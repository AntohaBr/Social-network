import React from 'react'
import s from 'Common/Forms-control/Forms-control.module.css'
import {Field} from 'redux-form'

// @ts-ignore
export const FormControl = ({input, meta:{touched,error}, children}) => {
    const showError = touched && error

    return (
        <div className={s.formControl + '' + (showError ? s.error : '')}>
            <div>
                {children}
            </div>
            {showError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

export const createField = (placeholder: string | null, name: string, validators: [] | [(value: string) => void],
                            component: any, props = {}, text = '') => {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/>{text}
    </div>
}