import {ResponseItemsType, usersAPI} from '../api/api'
import {Dispatch} from 'redux'


const initialState = {
    users: [] as ResponseItemsType[],
    pageSize: 30,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    portionSize: 10
}

export type initialStateType = typeof initialState

type UsersReducerActionType =
    ReturnType<typeof followSuccessAC>
    | ReturnType<typeof unfollowSuccessAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleFollowingProgressAC>

export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalCount: action.totalCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}


export const followSuccessAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unfollowSuccessAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users: ResponseItemsType[]) => ({type: 'SET_USERS', users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number) =>
    ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)


export const requestUsers = (currentPage:number,pageSize:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(currentPage,pageSize)
            .then(res => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(res.data.items))
                dispatch(setTotalUsersCountAC(res.data.totalCount))
            })
    }
}

export const follow = (userId:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true,userId))
        usersAPI.follow(userId)
            .then(res => {
                if (res.data.resultCode == 0) {
                    dispatch(followSuccessAC(userId))
                }
               dispatch(toggleFollowingProgressAC(false, userId))
            })
    }
}

export const unFollow = (userId:number)=>{
    return(dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true,userId))
        usersAPI.unFollow(userId)
            .then(res => {
                if (res.data.resultCode == 0) {
                    dispatch(unfollowSuccessAC(userId))
                }
                dispatch(toggleFollowingProgressAC(false, userId))
            })
    }
}