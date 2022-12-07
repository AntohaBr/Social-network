import {usersAPI} from "../api/api";
import {Dispatch} from "redux";


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    // followingInProgress: []
}

export type UserType = {
    id: number
    name: string
    status?: string
    photos: PhotosType
    followed: boolean
}

export type PhotosType = {
    small?: string
    large?: string
}

export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    // followingInProgress: []
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
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            // return {
            //     ...state,
            // //     followingInProgress: action.isFetching
            // //         ? [...state.followingInProgress, action.id]
            // //         : state.followingInProgress.filter(id => id !== action.id)
            // // }
        default:
            return state
    }
}



export const followSuccess = (id: number) => ({type: 'FOLLOW', id} as const)
export const unfollowSuccess = (id: number) => ({type: 'UNFOLLOW', id} as const)
export const setUsers = (users: UserType[]) => ({type: 'SET_USERS', users: users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (totalCount: number) =>
    ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, id: number) =>
    ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, id} as const)


export const getUsers = (currentPage:number,pageSize:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage,pageSize)
            .then(res => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(res.data.item))
                dispatch(setTotalUsersCount(res.data.totalCount))
            })
    }
}

export const follow = (id:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true,id))
        usersAPI.follow(id)
            .then(res => {
                if (res.data.resultCode == 0) {
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
            .then(res => {
                if (res.data.resultCode == 0) {
                    dispatch(unfollowSuccess(id))
                }
                dispatch(toggleFollowingProgress(false, id))
            })
    }
}