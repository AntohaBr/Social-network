import React from 'react';
import {UsersContainerType} from "./UsersContainer";
import styles from "./Users.module.css";
import axios from "axios";
import userPhoto from '../../assets/images/user.jpg'

class Users extends React.Component <UsersContainerType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.item)
        })
    }

    render() {
        return (

            <div>
                {
                    this.props.users.map(u => <div key={u.id}>
                <span>
<div>
    <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
</div>
<div>
    {u.followed ? <button onClick={() => {
        this.props.follow(u.id)
    }}>UnFollow</button> : <button onClick={() => {
        this.props.unFollow(u.id)
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
}

export default Users