import {ResponseItemsType, usersAPI} from '../Api/Api'
import {Dispatch} from 'redux'
import {updateObjectInArray} from '../Utils/Object-helpers'


const initialState = {
    users: [] as ResponseItemsType[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    portionSize: 10,
    error: ''
}


//reducers
export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case 'Users/FOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})}
        case 'Users/UNFOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})}
        case 'Users/SET_USERS':
            return {...state, users: action.users}
        case 'Users/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'Users/SET_TOTAL_USERS_COUNT':
            return {...state, totalCount: action.totalCount}
        case 'Users/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'Users/TOGGLE_IS_FOLLOWING_PROGRESS':
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


//actions
export const followSuccess = (userId: number) => ({type: 'Users/FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'Users/UNFOLLOW', userId} as const)
export const setUsers = (users: ResponseItemsType[]) => ({type: 'Users/SET_USERS', users} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'Users/SET_CURRENT_PAGE', currentPage: pageNumber} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: 'Users/SET_TOTAL_USERS_COUNT', totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'Users/TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
    ({type: 'Users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)


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
