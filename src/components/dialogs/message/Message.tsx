import React from 'react';
import s from './../Dialogs.module.css';

type messagePropsType={
    messages:string
}

const Message = (props: messagePropsType) => {
    return <div className={s.message}>{props.messages} </div>
}

export default Message;