import React, {FC} from 'react'
import s from './../Dialogs.module.css'

type MessagePropsType = {
    message: string
}

export const Message: FC<MessagePropsType> = React.memo( ({message}) => {
    return <div className={s.message}>{message}</div>
}
)
