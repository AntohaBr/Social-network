import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {MapStateToPropsType} from "./HeaderContainer";


export const Header = (props:MapStateToPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login
                  :  <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}
