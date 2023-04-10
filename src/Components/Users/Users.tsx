import React from 'react'
import {ItemsResponseType} from 'Api/Api'
import {User} from './User'
import {Paginator} from '../Common/Paginator/Paginator'


type UsersPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: ItemsResponseType[]
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
                <div>
                    <Paginator portionSize={props.portionSize}
                               totalCount={props.totalCount}
                               pageSize={props.pageSize}
                               sectionSize={10}
                               currentPage={props.currentPage}
                               onPageChanged={props.onPageChanged}/>
                </div>
            </div>
        )
    }



