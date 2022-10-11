const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
}

type UsersReducerActionType =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCount>

export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        default:
            return state;

    }
}


type FollowACType = {
    type: typeof FOLLOW
    userId: number
}

type UnFollowACType = {
    type: typeof UNFOLLOW
    userId: number
}

type SetUsersACType = {
    type: typeof SET_USERS
    users: UserType[]
}

type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}


export const followAC = (userId: number): FollowACType => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}

export const unFollowAC = (userId: number): UnFollowACType => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}

export const setUsersAC = (users: UserType[]): SetUsersACType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}

export const setCurrentPageAC = (pageNumber: number): SetCurrentPageACType => {
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