import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import userPhoto from 'Assets/Images/defaultUserPhoto.jpg'
import s from 'Components/Users/Users.module.css'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectUsersFollowingInProgress} from 'Store/Selectors'
import {follow, unFollow} from 'Redux/Users-reducer/Users-reducer'
import {ItemsResponseType} from 'Api/Users-api'

export const User: FC<{ user: ItemsResponseType }> = ({user}) => {
    const dispatch = useAppDispatch()
    const followingInProgress = useAppSelector(selectUsersFollowingInProgress)

    const disabledButton = followingInProgress.some(id => id === user.id)

    const onClickUnfollowHandler = () => {
        dispatch(unFollow(user.id))
    }

    const onClickFollowHandler = () => {
        dispatch(follow(user.id))
    }

    return (
        <div>
                <span>
                    <div className={s.userPhoto}>
                        <NavLink to={'/Profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                             alt={`user's avatar`}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={disabledButton}
                                      onClick={onClickUnfollowHandler}>Unfollow</button>
                            : <button disabled={disabledButton}
                                      onClick={onClickFollowHandler}>Follow</button>}
                    </div>
                </span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
        </div>
    )
}
