import React, {useEffect} from 'react'
import {Messages, MessageForm} from 'Components/Chat/'
import {useAppDispatch, useAppSelector} from 'Utils'
import {startChatMessages, stopChatMessages} from 'Redux/Chat-reducer'
import {selectStatus} from 'Store/Selectors'

export const Chat = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)

    useEffect(() => {
        dispatch(startChatMessages())

        return () => {
            stopChatMessages()
        }
    }, [])

    return (
        <div style={{marginLeft: '300px'}}>
            {status === 'error' && <div>Some error occured. Please refresh page</div>}
            <>
                <Messages/>
                <MessageForm/>
            </>
        </div>
    )
}