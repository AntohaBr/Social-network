import React from 'react'
import s from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectIsAuth, selectLogin, selectProfilePhotosSmall} from 'Store/Selectors'
import {logOut} from 'Redux/Auth-reducer'
import defaultUserPhoto from "Assets/Images/defaultUserPhoto.jpg";

export const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userPhoto = useAppSelector(selectProfilePhotosSmall)
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectLogin)

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <header className={s.header}>
            <img alt='logo' src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"/>
            {isAuth &&
                <div className={s.headerControl}>
                    <img alt='userPhoto' src={userPhoto ? userPhoto : defaultUserPhoto} className={s.mainPhoto}/>
                    <span className={s.userName}>{login}</span>
                    <button onClick={onClickLogOutHandler} className={s.buttonLogOut}>Log Out</button>
                </div>
            }
        </header>
    )
}
