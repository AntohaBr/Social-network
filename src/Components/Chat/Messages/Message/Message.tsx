import React, {FC} from 'react'
import {ChatMessageAPIType} from 'Api/Chat-api'
import defaultUserPhoto from 'Assets/Images/defaultUserPhoto.jpg'

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo ? message.photo : defaultUserPhoto}
                 alt='message url'
            />
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})