import React from 'react'
import s from './FormsControl.module.css'

// @ts-ignore
export const FormControl = ({input, meta, child, ...props}) => {
    const showError = meta.touched && meta.error

    return (
        <div className={s.formControl + '' + (showError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {showError && <span>{meta.error}</span>}
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