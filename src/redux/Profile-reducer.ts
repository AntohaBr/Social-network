import {Dispatch} from 'redux'
import {profileAPI} from '../api/api'
import {AppStateType} from "./Redux-store";


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how a you?', likesCount: 12},
        {id: 2, message: 'It`s my first post', likesCount: 10}
    ],
    newPostsText: '' as string,
    profile: null as ResponseProfileType | null,
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
        case 'profile/SET_PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SET_STATUS':
            return {...state, status: action.status}
        case 'profile/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case 'profile/SAVE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}


//actions
export const addPostAC = (newPostsText: string) => ({type: 'profile/ADD_POST', newPostsText} as const)
export const setProfile = (profile: ResponseProfileType) => ({type: 'profile/SET_PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'profile/SET_STATUS', status} as const)
export const deletePostAC = (postId: number) => ({type: 'profile/DELETE_POST', postId} as const)
export const savePhotoAC = (photos: any) => ({type: 'profile/SAVE_PHOTO', photos} as const)


//thanks
export const getProfile = (userId: string | null) => async (dispatch: Dispatch) => {
    const res = await profileAPI.getProfile(userId)
    dispatch(setProfile(res.data))
}

export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    const res = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(res.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}

export const savePhoto = (photos: any) => async (dispatch: Dispatch) => {
    const res = await profileAPI.savePhoto(photos)
    if (res.data.data.resultCode === 0) {
        dispatch(savePhotoAC(res.data.photos))
    }
}

export const saveProfile = (data: any) => async (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    const userId = getState().auth.id
    const res = await profileAPI.saveProfile(data)
    if (res.data.data.resultCode === 0) {
        dispatch(getProfile(userId))
    }
}


//types
export type initialStateType = typeof initialState
type ProfileReducerActionTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof savePhotoAC>

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ResponseProfileType = {
    aboutMe?: string
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos?: {
        small: string
        large: string
    }
}