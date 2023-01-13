import React from 'react'
import s from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'


type DialogItemPropsType = {
    id: number,
    name: string
}

export const DialogItem = (props: DialogItemPropsType) => {
    let dialogPath = '/Dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={dialogPath}>{props.name}</NavLink>
        </div>
    )
}

