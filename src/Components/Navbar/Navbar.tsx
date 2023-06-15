import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import {useAppSelector} from 'Utils/Hooks'
import {selectAuthId} from 'Store/Selectors'

export const Navbar = () => {
    const userId =useAppSelector(selectAuthId)

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