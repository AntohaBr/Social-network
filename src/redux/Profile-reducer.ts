import {Dispatch} from 'redux'
import {profileAPI, ResponseProfileType, usersAPI} from '../api/api'


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how a you?', likesCount: 12},
        {id: 2, message: 'It`s my first post', likesCount: 10}
    ],
    newPostsText: '',
    profile: {} as ResponseProfileType | null,
    status: '',
    postId: 1 as number
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {
    switch (action.type) {
        case 'profile/ADD_POST':
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostsText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostsText: ''}
        case 'profile/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SET_STATUS':
            return {...state, status: action.status}
        case 'profile/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        default:
            return state
    }
}


//actions
export const addPostAC = (newPostsText: string) => ({type: 'profile/ADD_POST', newPostsText} as const)
export const setUserProfileAC = (profile: ResponseProfileType | null) => ({type: 'profile/SET_USER_PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'profile/SET_STATUS', status} as const)
export const deletePostAC = (postId:number) => ({type: 'profile/DELETE_POST', postId} as const)


//thanks
export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const res = await usersAPI.getProfile(userId)
            dispatch(setUserProfileAC(res.data))
}

export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
   const res = await profileAPI.getStatus(userId)
            dispatch(setStatusAC(res.data))
}

export const updateStatusTC = (status: string) => async  (dispatch: Dispatch) => {
    const res = await profileAPI.updateStatus(status)
            if (res.data.data.resultCode === 0) {
                dispatch(setStatusAC(status))
        }
}


//types
export type initialStateType = typeof initialState
type ProfileReducerActionTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof deletePostAC>

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}