import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


export type PhotosType = {
    small: string
    large: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}


export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}

type UsersReducerActionType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state;

    }
}


type FollowSuccessType = {
    type: typeof FOLLOW
    id: number
}

type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    id: number
}

type SetUsersType = {
    type: typeof SET_USERS
    users: UserType[]
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    id: number
}


export const followSuccess = (id: number): FollowSuccessType => {
    return {
        type: FOLLOW,
        id: id
    } as const
}

export const unfollowSuccess = (id: number): UnfollowSuccessType => {
    return {
        type: UNFOLLOW,
        id: id
    } as const
}

export const setUsers = (users: UserType[]): SetUsersType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}

export const setCurrentPage = (pageNumber: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    } as const
}

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalCount
    } as const
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    } as const
}

export const toggleFollowingProgress = (isFetching: boolean, id: number): ToggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching: isFetching,
        id: id
    } as const
}


export const getUsers = (currentPage:number,pageSize:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage,pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.item))
                dispatch(setTotalUsersCount(data.totalCount))
            })
    }
}

export const follow = (id:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true,id))
        usersAPI.follow(id)
            .then(responce => {
                if (responce.data.resultCode == 0) {
                    dispatch(followSuccess(id))
                }
               dispatch(toggleFollowingProgress(false, id))
            })
    }
}

export const unFollow = (id:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true,id))
        usersAPI.unFollow(id)
            .then(responce => {
                if (responce.data.resultCode == 0) {
                    dispatch(unfollowSuccess(id))
                }
                dispatch(toggleFollowingProgress(false, id))
            })
    }
}