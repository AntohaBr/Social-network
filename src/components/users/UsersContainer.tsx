import React from 'react';
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCount,
    setUsersAC,
    unFollowAC,
    UserType
} from "../../redux/Users-Reducer";
import {Dispatch} from "redux";
import {RootStateType} from "../../redux/Store";
import axios from "axios";
import {Users} from "./Users";



export type UsersContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class UsersContainer extends React.Component <UsersContainerType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}& count = ${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.item)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}& count = ${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.item)
            })
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      follow={this.props.follow}
                      unFollow={this.props.unFollow}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
        />
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}


const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCount(totalCount))
        }
    }
}


export default connect (mapStateToProps, mapDispatchToProps)(UsersContainer)
