const initialState = {
    users: [
        {
            id: 1,
            photoUrl: 'https://nekto.me/images/897000/158/photos/p_a53bcde6f8.jpg',
            followed: false,
            fullName: 'Anton',
            status: 'I am a boss',
            location: {city: 'Gomel', counter: 'Belarus'}
        },
        {
            id: 2,
            photoUrl: 'https://nekto.me/images/897000/158/photos/p_a53bcde6f8.jpg',
            followed: true,
            fullName: 'Max',
            status: 'I am a boss too',
            location: {city: 'LA', counter: 'USA'}
        },
        {
            id: 3,
            photoUrl: 'https://nekto.me/images/897000/158/photos/p_a53bcde6f8.jpg',
            followed: false,
            fullName: 'Alex',
            status: 'I am a boss too ',
            location: {city: 'Berlin', counter: 'Germany'}
        },
    ]
}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'

type LocationType = {
    city: string
    counter: string
}

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}

export type initialStateType = {
    users: Array<UserType>
}

type UsersReducerActionType =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>

export const usersReducer = (state: initialStateType = initialState, action: UsersReducerActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
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
    users: Array<UserType>
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

export const setUsersAC = (users: Array<UserType>): SetUsersACType => {
    return {
        type: SET_USERS,
        users: users
    } as const
}