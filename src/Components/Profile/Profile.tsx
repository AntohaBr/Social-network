import React, {useEffect} from 'react'
import {getProfile, getStatus} from 'Redux/Profile-reducer/Profile-reducer'
import {ProfileInfo, MyPosts} from "Components/Profile"
import {useAppDispatch, useAppSelector} from 'Utils'
import {Navigate, useParams} from 'react-router-dom'
import {selectAuthId, selectIsAuth} from 'Store/Selectors'
import {PATH} from 'Constants/Routing-constants'
import s from './Profile.module.scss'

export const Profile = () => {
    let {userId} = useParams()
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const authorizedUserId = useAppSelector(selectAuthId)

    useEffect(() => {
        const profileId: number | null = Number(userId)
        if (profileId) {
            dispatch(getProfile(profileId))
            dispatch(getStatus(profileId))
        } else {
            if (isAuth && authorizedUserId) {
                dispatch(getProfile(authorizedUserId))
                dispatch(getStatus(authorizedUserId))
            }
        }
    }, [userId, isAuth, authorizedUserId])

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profile}>
            <ProfileInfo isOwner={!userId}/>
            <MyPosts/>
        </div>
    )
}
