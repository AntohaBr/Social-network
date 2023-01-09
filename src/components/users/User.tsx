import React from 'react'
import {ResponseItemsType} from '../../api/api'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../assets/images/Foto.png'
import s from './Users.module.css'


type UserPropsType = {
    user: ResponseItemsType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: number[]

}

export const User = (props: UserPropsType) => {
    return (
        <div>
                <span>
                    <div className={s.userPhoto}>
                        <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small !== null ? props.user.photos.small : userPhoto}
                             alt={`user's avatar`}/>
                        </NavLink>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.unFollow(props.user.id)
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                                props.follow(props.user.id)
                            }}>Follow</button>}
                    </div>
                </span>
            <span>
                        <span>
                            <div>{props.user.name}</div>
                            <div>{props.user.status}</div>
                        </span>
            </span>
        </div>
    )
}