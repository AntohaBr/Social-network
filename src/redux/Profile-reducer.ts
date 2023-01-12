import {Dispatch} from 'redux'
import {profileAPI} from '../api/api'
import {AppStateType} from './Redux-store'
import {stopSubmit} from 'redux-form'
import {AxiosError} from "axios";


const initialState = {
    posts: [
        {id: 1, message: 'Hi, how a you?', likesCount: 12},
        {id: 2, message: 'It`s my first post', likesCount: 10}
    ] as PostType[],
    profile: null as IMainUser | null,
    status: '',
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
            return {...state, posts: [...state.posts, newPost]}
        case 'profile/SET_PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SET_STATUS':
            return {...state, status: action.status}
        case 'profile/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case 'profile/SAVE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}


//thanks
export const getProfile = (userId: string | null) => async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.getProfile(userId)
        dispatch(setProfile(res))
    } catch (err) {
        const error = err as AxiosError
    }

}

export const getStatus = (userId: string) => async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res))
    }catch (err) {
        const error = err as AxiosError
    }
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    } else if (res.data.resultCode === 1) {
        alert(res.data.messages[0])
    }
}

export const savePhoto = (photos: any) => async (dispatch: Dispatch) => {
    const res = await profileAPI.savePhoto(photos)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoAC(res.data.photos))
    }

}

export const saveProfile = (data: any) => async (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    const userId = getState().auth.id
    const res = await profileAPI.saveProfile(data)
    if (res.data.data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit('profileEdit', {_error: res.data.messages[0]}))
        return Promise.reject(res.data.messages[0])
    }
}


//actions
export const addPost = (newPostsText: string) => ({type: 'profile/ADD_POST', newPostsText} as const)
export const setProfile = (profile: IMainUser) => ({type: 'profile/SET_PROFILE', profile} as const)
export const setStatus = (status: string) => ({type: 'profile/SET_STATUS', status} as const)
export const deletePost = (id: number) => ({type: 'profile/DELETE_POST', id} as const)
export const savePhotoAC = (photos: any) => ({type: 'profile/SAVE_PHOTO', photos} as const)


//types
export type initialStateType = typeof initialState

type ProfileReducerActionTypes = ReturnType<typeof addPost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoAC>

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export interface IMainUser {
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