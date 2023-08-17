import {usersAPI} from 'Api'
import {updateObjectInArray, handleServerNetworkError} from 'Utils'
import {AppActionsType, AppDispatchType, AppThunkType, InferActionsTypes} from 'Store/Store'
import {ResponseType, ResultCodeEnum} from 'Api/Auth-api'
import {ItemsResponseType} from 'Api/Users-api'
import {appActions} from 'Redux/App-reducer'

const initialState = {
    users: [] as ItemsResponseType[],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as number[],
    portionSize: 10,
    error: '',
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

//reducers
export const usersReducer = (state: UsersInitialStateType = initialState, action: UsersReducerActionType): UsersInitialStateType => {
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
        case 'Users/SET_FILTER':
            return {...state, filter: action.payload}
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
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        dispatch(userActions.toggleIsFetching(true))
        dispatch(userActions.setCurrentPage(currentPage))
        dispatch(userActions.setFilter(filter))
        const res = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(userActions.toggleIsFetching(false))
        dispatch(userActions.setUsers(res.items))
        dispatch(userActions.setTotalUsersCount(res.totalCount))
        dispatch(appActions.setAppStatus('success'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const followUnFollowFlow = async (dispatch: AppDispatchType,
                                         userId: number,
                                         apiMethod: (userId: number) => Promise<ResponseType>,
                                         actionCreator: (userId: number) => AppActionsType) => {
    dispatch(userActions.toggleFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(userActions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): AppThunkType => async (dispatch) => {
    return await followUnFollowFlow(dispatch, userId,
        usersAPI.follow.bind(usersAPI),
        userActions.followSuccess)
}

export const unFollow = (userId: number): AppThunkType => async (dispatch) => {
    return await followUnFollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), userActions.unfollowSuccess)
}

//actions
export const userActions = {
    followSuccess: (userId: number) => ({type: 'Users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'Users/UNFOLLOW', userId} as const),
    setUsers: (users: ItemsResponseType[]) => ({type: 'Users/SET_USERS', users} as const),
    setCurrentPage: (pageNumber: number) => ({
        type: 'Users/SET_CURRENT_PAGE',
        currentPage: pageNumber
    } as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'Users/SET_TOTAL_USERS_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'Users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: 'Users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
    setFilter: (filter: FilterType) => ({type: 'Users/SET_FILTER', payload: filter} as const)
}

//types
export type UsersInitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UsersReducerActionType = InferActionsTypes<typeof userActions>
