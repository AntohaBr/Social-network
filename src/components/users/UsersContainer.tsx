import React from 'react';
import {connect} from "react-redux";
import {followAC, setUsersAC, unFollowAC, UserType} from "../../redux/Users-Reducer";
import {Dispatch} from "redux";
import {RootStateType} from "../../redux/Store";
import {Users} from "./Users";


export type UsersContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    users: Array<UserType>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}


let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}


let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
