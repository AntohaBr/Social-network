import React, {FC} from 'react'
import {ChatMessageType} from 'Api/Chat-api'

export const Message: FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}