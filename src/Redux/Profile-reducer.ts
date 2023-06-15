import {profileAPI} from 'Api'
import {AppThunkType} from 'Store/Store'
import {stopSubmit} from 'redux-form'
import {AxiosError} from 'axios'
import {toggleIsFetching} from 'Redux/Users-reducer'

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how a you?', likesCount: 12},
        {id: 2, message: 'It`s my first Post', likesCount: 10}
    ] as PostType[],
    newPostText: '',
    profile: {} as ProfileType,
    status: '',
}

//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {
    switch (action.type) {
        case 'Profile/ADD_POST':
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPostsText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost]}
        case 'Profile/SET_PROFILE':
            return {...state, profile: action.profile}
        case 'Profile/SET_STATUS':
            return {...state, status: action.status}
        case 'Profile/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        case 'Profile/SAVE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state
    }
}


//thanks
export const getProfile = (userId: number): AppThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        const res = await profileAPI.getProfile(userId)
        dispatch(toggleIsFetching(false))
        dispatch(setProfile(res.data))
    } catch (err) {
        const error = err as AxiosError
    }

}

export const getStatus = (userId: number): AppThunkType => async (dispatch) => {
    try {
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res))
    } catch (err) {
        const error = err as AxiosError
    }
}

export const updateStatus = (status: string): AppThunkType => async (dispatch) => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    } else if (res.data.resultCode === 1) {
        alert(res.data.messages[0])
    }
}

export const savePhoto = (file: File): AppThunkType => async (dispatch) => {
    const res = await profileAPI.savePhoto(file)
    if (res.data.resultCode === 0) {
        dispatch(savePhotoAC(res.data.photos))
    }
}

export const saveProfile = (data: ProfileType): AppThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const res = await profileAPI.saveProfile(data)
    if (res.data.resultCode === 0) {
        // @ts-ignore
        dispatch(getProfile(userId))
    } else {
        dispatch(stopSubmit('profileEdit', {_error: res.data.messages[0]}))
        return Promise.reject(res.data.messages[0])
    }
}


//actions
export const addPost = (newPostsText: string) => ({type: 'Profile/ADD_POST', newPostsText} as const)
export const setProfile = (profile: ProfileType) => ({type: 'Profile/SET_PROFILE', profile} as const)
export const setStatus = (status: string) => ({type: 'Profile/SET_STATUS', status} as const)
export const deletePost = (id: number) => ({type: 'Profile/DELETE_POST', id} as const)
export const savePhotoAC = (photos: PhotosResponseType) => ({type: 'Profile/SAVE_PHOTO', photos} as const)


//types
export type initialStateType = typeof initialState

export type ProfileReducerActionTypes = ReturnType<typeof addPost>
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoAC>

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsResponseType
    photos: PhotosResponseType
}

export type PhotosResponseType = {
    small: string
    large: string
}

export type ContactsResponseType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}