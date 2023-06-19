import {profileAPI} from 'Api'
import {AppThunkType, InferActionsTypes} from 'Store/Store'
import {stopSubmit} from 'redux-form'
import {AxiosError} from 'axios'
import {toggleIsFetching} from 'Redux/Users-reducer'
import {appActions} from "Redux/App-reducer";
import {handleServerNetworkError} from "Utils/Error-handler";
import {ResultCodeEnum} from "Api/Auth-api";

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
export const getProfile = (profileId: number): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await profileAPI.getProfile(profileId)
        dispatch(profileActions.setProfile(res))
        dispatch(appActions.setAppStatus('success'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const getStatus = (profileId: number): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await profileAPI.getStatus(profileId)
        dispatch(profileActions.setStatus(res))
        dispatch(appActions.setAppStatus('success'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const updateStatus = (status: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await profileAPI.updateStatus(status)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(profileActions.setStatus(status))
            dispatch(appActions.setAppStatus('success'))
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const savePhoto = (file: File): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await profileAPI.savePhoto(file)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(profileActions.savePhotoAC(res.data.photos))
            dispatch(appActions.setAppStatus('success'))
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const saveProfile = (data: ProfileType): AppThunkType => async (dispatch, getState) => {
    dispatch(appActions.setAppStatus('loading'))
    const profileId = getState().auth.id
    try {
        const res = await profileAPI.saveProfile(data)
        if (res.resultCode === ResultCodeEnum.Success && profileId) {
            dispatch(getProfile(profileId))
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}


//actions
export const profileActions = {
    addPost: (newPostsText: string) => ({type: 'Profile/ADD_POST', newPostsText} as const),
    setProfile: (profile: ProfileType) => ({type: 'Profile/SET_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'Profile/SET_STATUS', status} as const),
    deletePost: (id: number) => ({type: 'Profile/DELETE_POST', id} as const),
    savePhotoAC: (photos: PhotosResponseType) => ({type: 'Profile/SAVE_PHOTO', photos} as const)
}

//types
export type initialStateType = typeof initialState

export type ProfileReducerActionTypes = InferActionsTypes<typeof profileActions>

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