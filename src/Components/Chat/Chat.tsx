import React, {useEffect} from 'react'
import {Messages, MessageForm} from 'Components/Chat/'
import {useAppDispatch} from 'Utils'
import {startChatMessages, stopChatMessages} from 'Redux/Chat-reducer'

export const Chat = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startChatMessages())

        return () => {
            dispatch(stopChatMessages())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <MessageForm/>
        </div>
    )
}