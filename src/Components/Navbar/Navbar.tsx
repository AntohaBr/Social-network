import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppStateType} from 'Store/Store'


export const Navbar = () => {
    const userId = useSelector<AppStateType, number| null>(state => state.auth.id)
    console.log(userId)
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={`/profile/${userId}`} className={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={s.activeLink}>Settings</NavLink>
            </div>
        </nav>
    )
}
