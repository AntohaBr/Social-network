import React from 'react'
import {connect} from 'react-redux'
import {
    follow, requestUsers, setCurrentPage,
    toggleFollowingProgress, unFollow,
} from '../../Redux/Users-reducer'
import {Users} from './Users'
import {Preloader} from '../Common/Preloader/Preloader'
import {AppStateType} from '../../Redux/Redux-store'
import {ResponseItemsType} from '../../Api/Api'
import {compose} from 'redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalCount, getUser,
} from '../../Redux/Users-selectors'
import {withAuthRedirect} from "../../HOK/With-auth-redirect";


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
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
}


class UsersContainer extends React.Component <UsersContainerType> {
    componentDidMount() {
        const {currentPage,pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(pageNumber, pageSize)
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
        users: getUser(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {follow, unFollow, setCurrentPage, toggleFollowingProgress, requestUsers})
)(UsersContainer)
