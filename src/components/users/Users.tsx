import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/Users-Reducer";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    followingInProgress: []
    follow: (id: number) => void
    unFollow: (id: number) => void
}


export const Users = (props: UsersType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)

        return (
            <div>
                <div>
                    {pages.map(p => {
                        return (
                            <span
                                  className = {props.currentPage === p && styles.selectedPage} onClick={() => {
                                props.onPageChanged(p)
                            }}>{p}</span>
                        )
                    })}
                </div>
                {
                    props.users.map(u => <div key={u.id}>
                <span>
<div>
    <NavLink to={'/profile/' + u.id}>
    <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
    </NavLink>
</div>
<div>
    {u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
props.unFollow(u.id)

    }}>UnFollow</button>
        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
        props.follow(u.id)}}>
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
                        <div>{'u.followed'}</div>
                        </span>
                        </span>
                        </div>
                    )
                }
            </div>
        )

    }
}


