import React from 'react';
import s from './Users.module.css';
import {ResponseItemsType} from '../../api/api';
import {User} from "./User";
import {Paginator} from "../common/Paginator/Paginator";


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: ResponseItemsType[]
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    portionSize: number
}


export const Users = (props: UsersPropsType) => {

        return (
            <div>
                <div>
                    {
                        props.users.map(u => <User key={u.id}
                                                   user={u}
                                                   follow={props.follow}
                                                   unFollow={props.unFollow}
                                                   followingInProgress={props.followingInProgress}
                        />)
                    }
                </div>
                {/*<div>*/}
                {/*    <Paginator portionSize={props.portionSize}*/}
                {/*               totalCount={props.totalCount}*/}
                {/*               pageSize={props.pageSize}*/}
                {/*               currentPage={props.currentPage}*/}
                {/*               onPageChanged={props.onPageChanged}/>*/}
                {/*</div>*/}
            </div>
        )
    }



