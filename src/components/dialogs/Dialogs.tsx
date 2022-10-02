import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import Message from "./message/Message";
import DialogItem from "./dialogItem/DialogsItem";
import {DialogsType} from "./DialogsContainer";


type DialogsPropsType = DialogsType


export const dialogs = (props: DialogsPropsType) => {
    const state = props.messagePage
    const dialogsElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    const messagesElement = state.messages.map(m => <Message messages={m.message} key={m.id}/>);
    const newMessageBody = state.newMessageBody;
    const onSendMessageClick = () => {
        props.sendMessage()
    }

    const onNewMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const body = event.currentTarget.value;
        props.updateNewMessageBody(body)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'
                    ></textarea></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

