type validateType = {
    email?: string
    password?: string
    rememberMe?: boolean
    term?: string
}

export const validate = (values: validateType) => {
    const errors: validateType = {}

    if (values.email !== undefined) {
        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
    }

    if (values.password !== undefined) {
        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 3) {
            errors.password = 'Password Must be 3 characters or more'
        }
    }
    return errors
}