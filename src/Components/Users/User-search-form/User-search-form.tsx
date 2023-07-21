import React from 'react'
import {Field, Form, Formik} from 'formik'
import {useAppDispatch, useAppSelector, validate} from 'Utils'
import {FilterType, getUsers} from 'Redux/Users-reducer/Users-reducer'
import {selectUsersFilter, selectUsersPageSize} from 'Store/Selectors'

export const UserSearchForm = React.memo(() => {
    const dispatch = useAppDispatch()
    const filter = useAppSelector(selectUsersFilter)
    const pageSize = useAppSelector(selectUsersPageSize)

    const onKeyPressSendMessage = (event: any, values: FormType,
                                   {setSubmitting}: { setSubmitting: (setSubmitting: boolean) => void }) => {
        if (event.code === 'Enter') {
            submit(values, {setSubmitting})
        }
    }

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (setSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null
                : values.friend === 'true' ? true : false
        }

        dispatch(getUsers(1, pageSize, filter))
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
                validate={validate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field
                            type='text'
                            name='term'
                            placeholder='Search'
                            onKeyPress={onKeyPressSendMessage}
                        />
                        <Field
                            name="friend"
                            as="select"
                            onKeyPress={onKeyPressSendMessage}>
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>Find</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

//types
type FriendType = 'true' | 'false' | 'null'
type FormType = {
    term: string
    friend: FriendType
}