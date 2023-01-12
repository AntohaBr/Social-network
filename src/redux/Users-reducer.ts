import {ResponseItemsType, usersAPI} from '../api/api'
import {Dispatch} from 'redux'
import {updateObjectInArray} from '../utils/Object-helpers'


const initialState = {
    users: [] as ResponseItemsType[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    portionSize: 10
}


//reducers
export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})}
        case 'users/UNFOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})}
        case 'users/SET_USERS':
            return {...state, users: action.users}
        case 'users/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'users/SET_TOTAL_USERS_COUNT':
            return {...state, totalCount: action.totalCount}
        case 'users/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
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


//actions
export const followSuccess = (userId: number) => ({type: 'users/FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'users/UNFOLLOW', userId} as const)
export const setUsers = (users: ResponseItemsType[]) => ({type: 'users/SET_USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)


//thanks
export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const res = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(res.data.items))
    dispatch(setTotalUsersCount(res.data.totalCount))
}

export const followUnFollowFlow = async (dispatch: Dispatch, userId: number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI)
    followUnFollowFlow(dispatch, userId, apiMethod, followSuccess)
}

export const unFollow = (userId: number) => async (dispatch: Dispatch) => {
    const apiMethod = usersAPI.unFollow.bind(usersAPI)
    followUnFollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
}


//types
export type initialStateType = typeof initialState
type UsersReducerActionType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
