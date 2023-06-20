import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch} from 'Utils'
import {SubmitHandler, useForm} from 'react-hook-form'
import {messageActions} from 'Redux/Message-reducer'

export const MessageForm = () => {
    const dispatch = useAppDispatch()

    const [message, setMessage] = useState('')

    const {register, formState: {errors}, handleSubmit} = useForm<{ message: string }>({
        defaultValues: {
            message: '',
        },
        mode: "onSubmit"
    })

    const onSubmit: SubmitHandler<{ message: string }> = () => {
        dispatch(messageActions.sendMessage())
        setMessage('')
    }

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
        dispatch(messageActions.updateNewMessage(e.currentTarget.value))
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} onKeyPress={(e) => onEnterPress(e.key)}>
                <div>
                    <textarea
                        placeholder='Write you want to say'
                        {...register('message', {
                            required: {
                                value: true,
                                message: 'Write something)',
                            }
                        })}
                        value={message}
                        onChange={onMessageChange}
                    />
                </div>
                {errors.message && <div> {Object.values(errors).map((e, idx) => {
                    return (<p key={idx}>{e.message}</p>)
                })}</div>
                }
                <div>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}


