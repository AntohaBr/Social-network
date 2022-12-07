import React from 'react';
import {connect} from "react-redux";
import {
    follow, getUsers, setCurrentPage,
    toggleFollowingProgress, unFollow,
    UserType
} from "../../redux/Users-Reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/Redux-store";


export type UsersContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}

type MapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    getUsers:(currentPage: number, pageSize: number)=>void
}


class UsersContainer extends React.Component <UsersContainerType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   // followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow, unFollow, setCurrentPage, toggleFollowingProgress, getUsers})(UsersContainer)
