import React, {FC} from 'react'
import s from 'Components/Navbar/Navbar.module.scss'
import {NavLink} from 'react-router-dom'
import {useAppSelector} from 'Utils'
import {selectIsAuth} from 'Store/Selectors'
import {PATH} from 'Constants/Routing-constants'

export const Navbar: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)

    return (
        <div>
            {isAuth &&
                <nav className={s.nav}>
                    <div className={s.item}>
                        <NavLink to={`${PATH.PROFILE}/:userId`} className={s.activeLink}>Profile</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={PATH.USERS} className={s.activeLink}>Users</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to={PATH.CHAT} className={s.activeLink}>Chat</NavLink>
                    </div>
                </nav>
            }
        </div>
    )
}
