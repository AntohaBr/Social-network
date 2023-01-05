import React from 'react';
import {connect} from 'react-redux';
import {
    follow, requestUsers, setCurrentPageAC,
    toggleFollowingProgressAC, unFollow,
} from '../../redux/Users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {AppStateType} from '../../redux/Redux-store';
import {ResponseItemsType} from '../../api/api';
import {compose} from "redux";
import {WithAuthRedirect} from "../../hok/WithAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalCount,
    getUsers
} from "../../redux/Users-selectors";


export type UsersContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    users: ResponseItemsType[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    portionSize: number
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}


class UsersContainer extends React.Component <UsersContainerType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {

        return (
            <div>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalCount={this.props.totalCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   portionSize={this.props.portionSize}
            />
        </div>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, {follow, unFollow, setCurrentPageAC, toggleFollowingProgressAC, requestUsers})
)(UsersContainer)
