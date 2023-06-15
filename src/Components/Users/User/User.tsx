import React, {FC} from 'react'
import {ItemsResponseType} from 'Api/Api'
import {NavLink} from 'react-router-dom'
import userPhoto from 'Assets/Images/defaultUserPhoto.jpg'
import s from 'Components/Users/Users.module.css'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectUsersFollowingInProgress} from 'Store/Selectors'
import {follow, unFollow} from 'Redux/Users-reducer'

type UserPropsType = {
    user: ItemsResponseType
}

export const User: FC<UserPropsType> = ({user}) => {
    const dispatch = useAppDispatch()
    const followingInProgress = useAppSelector(selectUsersFollowingInProgress)

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
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={onClickUnfollowHandler}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
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