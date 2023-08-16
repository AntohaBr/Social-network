import React, {FC, useEffect, useRef, useState} from 'react'
import {Message} from 'Components/Chat/Messages/Message/Message'
import {useAppSelector} from 'Utils'
import {selectChatMessages} from 'Store/Selectors'

export const Messages: FC = () => {
    const messages = useAppSelector(selectChatMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)


    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget

        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: "auto"}} onScroll={onScrollHandler}>
            {messages.map((message) =>
                <Message key={message.id} message={message}/>
            )}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}