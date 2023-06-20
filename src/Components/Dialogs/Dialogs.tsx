import React from 'react'
import s from './Dialogs.module.css'
import {Message} from './Message/Message'
import {DialogItem} from './Dalog-item/Dialogs-item'
import {useAppSelector} from 'Utils'
import {selectDialogs, selectMessages} from 'Store/Selectors'
import {MessageForm} from 'Components/Dialogs/Message-form/Message-form'

export const Dialogs = () => {
    const messages = useAppSelector(selectMessages)
    const dialogs = useAppSelector(selectDialogs)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogs.map(dialog => <DialogItem key={dialog.dialogId} nameUser={dialog.nameUser}
                                                   dialogId={dialog.dialogId}/>)}
            </div>
            <div className={s.messages}>
                <div>{messages.map(message => <Message key={message.messageId} message={message.message}/>)}</div>
            </div>
            <MessageForm/>
        </div>
    )
}

