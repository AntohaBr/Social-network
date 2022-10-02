import React from 'react';
import {UsersContainerType} from "./UsersContainer";
import styles from "./Users.module.css";
import axios from "axios";


export const Users = (props: UsersContainerType) => {
     // const instance = axios.create({
     //        withCredentials: true,
     //        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
     //        headers:     {
     //            "API-KEY": "ae4b4be5-c22f-4740-a061-685e83021457"
     //        }
     //    });

    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.item)
        })
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
<div>
    <img src={u.photoUrl} className={styles.userPhoto}/>
</div>
<div>
    {u.followed ? <button onClick={() => {
        props.follow(u.id)
    }}>Unfollow</button> : <button onClick={() => {
        props.unFollow(u.id)
    }}>Follow</button>}
</div>
</span>
                        {/*1 yarn create react-app name --template typescript*/}
                        <span>
                     <span>
                         <div>{u.fullName}</div>
                         <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.counter'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
                    </div>
                )
            }
        </div>
    )
}
