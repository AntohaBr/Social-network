import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {UserType} from "../../redux/Users-Reducer";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users:UserType[]
    follow:(userId: number)=>void
    unFollow: (userId: number)=>void
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
                            <span className ={props.currentPage === p && styles.selectedPage} onClick={() => {
                            props.onPageChanged(p)}}>{p}</span>
                        )
                    })}
                </div>
                {
                    props.users.map(u => <div key={u.id}>
                <span>
<div>
    <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
</div>
<div>
    {u.followed ? <button onClick={() => {
        props.follow(u.id)
    }}>UnFollow</button> : <button onClick={() => {
        props.unFollow(u.id)
    }}>Follow</button>
    }
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