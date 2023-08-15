import React, {FC} from 'react'
import {Message} from 'Components/Chat/Messages/Message/Message'
import {useAppSelector} from 'Utils'
import {selectChatMessages} from 'Store/Selectors'

export const Messages: FC = () => {
    const messages = useAppSelector(selectChatMessages)

    return (
        <div style={{height: '400px', overflowY: "auto"}}>
            {messages.map((message, index) =>
                <Message key={index} message={message}/>
            )}
        </div>
    )
}