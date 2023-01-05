import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    isAuth: boolean | null
    login: string | null
    logOut: () => void
}

export const Header = (props:HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}
                        <button onClick={props.logOut} style={{margin: '10px'}}>Log Out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}
