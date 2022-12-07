import React from 'react';
import s from './../Dialogs.module.css';

type messagePropsType={
    messages:string
}

export const Message = (props: messagePropsType) => {
    return <div className={s.message}>{props.messages} </div>
}

