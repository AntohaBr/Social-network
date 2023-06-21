import React from 'react'
import s from './Dialogs.module.css'
import {useAppSelector} from 'Utils'
import {selectDialogs, selectIsAuth, selectMessages} from 'Store/Selectors'
import {DialogItem, Message, MessageForm} from 'Components/Dialogs'
import {Navigate} from 'react-router-dom'
import {PATH} from 'Constants/Routing-constants'

export const Dialogs = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const messages = useAppSelector(selectMessages)
    const dialogs = useAppSelector(selectDialogs)

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

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

