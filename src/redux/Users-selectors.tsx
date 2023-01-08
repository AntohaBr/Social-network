import {AppStateType} from "./Redux-store"
import {createSelector} from "reselect"

const getUsersSelector = (state:AppStateType) => {
    return state.usersPage.users
}

export const getUser = createSelector(getUsersSelector, (users) =>{
    return users.filter( u => true)
})


export const getPageSize = (state:AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state:AppStateType) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state:AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state:AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state:AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state:AppStateType) => {
    return state.usersPage.portionSize
}