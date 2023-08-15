import React, {ChangeEvent, TextareaHTMLAttributes, useState} from 'react'
import {useAppDispatch} from 'Utils'
import {sendMessage} from 'Redux/Chat-reducer'

export const MessageForm = () => {
    const [message, setMessage] = useState('')

    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const sendMessageHandler = () => {
        if (!message) {
            alert('You should write something')
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    const onKeyPressHandler = (event: any) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') {
            sendMessageHandler()
        }
    }

    return (
        <div style={{marginTop: '50px'}}>
            <div>
                <textarea
                    value={message}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    placeholder='Press Ctrl+Enter or button Send to send message'
                />
            </div>
            <div>
                <button onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}