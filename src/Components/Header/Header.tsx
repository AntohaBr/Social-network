import React from 'react'
import s from './Header.module.css'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectAuthId, selectIsAuth, selectLogin, selectProfile, selectProfilePhotosSmall} from 'Store/Selectors'
import {logOut} from 'Redux/Auth-reducer'
import defaultUserPhoto from 'Assets/Images/defaultUserPhoto.jpg'

export const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userPhoto = useAppSelector(selectProfilePhotosSmall)
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectLogin)
    const loginId = useAppSelector(selectAuthId)
    const profile = useAppSelector(selectProfile)
    const isMyProfile = loginId === profile.userId

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
                    {isMyProfile &&
                        <img alt='userPhoto' src={userPhoto ? userPhoto : defaultUserPhoto} className={s.mainPhoto}/>
                    }
                    <span className={s.userName}>{login}</span>
                    <button onClick={onClickLogOutHandler} className={s.buttonLogOut}>Log Out</button>
                </div>
            }
        </header>
    )
}
