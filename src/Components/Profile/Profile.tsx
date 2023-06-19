import React, {useEffect} from 'react'
import {getProfile, getStatus} from 'Redux/Profile-reducer'
import {ProfileInfo} from "Components/Profile/Profile-info"
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {useParams} from 'react-router-dom'
import {selectAuthId, selectIsAuth} from 'Store/Selectors'
import {MyPosts} from 'Components/Profile/My-posts/My-posts'

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

    return (
        <div>
            <ProfileInfo
                isOwner={!userId}
            />
            <MyPosts/>
        </div>
    )
}
