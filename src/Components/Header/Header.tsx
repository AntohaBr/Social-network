import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'


type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}


export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img alt='logo'
                 src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"/>
            {props.isAuth
                ? <div className={s.headerControl}>
                    {props.login}
                    <button onClick={props.logOut} className={s.button}>Log Out</button>
                </div>
                : <NavLink to={'/Login'}/>
            }
        </header>
    )
}
