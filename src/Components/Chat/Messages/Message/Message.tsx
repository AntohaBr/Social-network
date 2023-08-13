import React, {FC} from 'react'
import {ChatMessageType} from 'Api/Chat-api'

export const Message: FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo}/>
            <div>
                {message.userName}
            </div>
            <div>
                {message.message}
            </div>
        </div>
    )
}