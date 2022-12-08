import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import {NavLink} from 'react-router-dom';
import {ResponseItemsType} from '../../api/api';
import {FollowingInProgressType} from "../../redux/Users-reducer";


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: ResponseItemsType[]
    followingInProgress: FollowingInProgressType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}


export const Users = (props: UsersPropsType) => {
    const pagesCount = Math.ceil(props.totalCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <span className={props.currentPage === p && s.selectedPage}
                                     onClick={() => {
                                         props.onPageChanged(p)
                                     }}
                        >{p}</span>
                    })}
                </div>
                {
                    props.users.map(u => <div key={u.id}>
                <span>
<div>
    <NavLink to={'/profile/' + u.id}>
    <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}/>
    </NavLink>
</div>
<div>
    {u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
            props.unFollow(u.id)
        }}>UnFollow</button>
        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
            props.follow(u.id)
        }}>
            Follow</button>}
</div>
                </span>
                            <span>
                     <span>
                         <div>{u.name}</div>
                         <div>{u.status}</div>
                        </span>
                        <span>
                        <div>{'u.photos'}</div>
                        <div>{u.followed}</div>
                        </span>
                        </span>
                        </div>
                    )
                }
            </div>
        )

    }
}


