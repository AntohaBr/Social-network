import React, {FC} from 'react'
import {ChatMessageAPIType} from 'Api/Chat-api'

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo}
                 alt='message url'
            />
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})