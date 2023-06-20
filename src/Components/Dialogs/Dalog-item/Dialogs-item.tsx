import React, {FC} from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

type DialogItemPropsType = {
    dialogId: number,
    nameUser: string
}

export const DialogItem: FC<DialogItemPropsType> = ({dialogId,nameUser}) => {
    let dialogPath = '/Dialogs/' + dialogId
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={dialogPath}>{nameUser}</NavLink>
        </div>
    )
}

