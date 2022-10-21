import {PostType} from "./Store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const initialState = {
    posts: [
        {id: 1, message: 'Hi, how a you?', likesCount: 12},
        {id: 2, message: 'It`s my first post', likesCount: 10}
    ],
    newPostsText: 'it-kamasutra.com',
    profile: null
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE'



export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {
    small: string
    large: string
}




const profilePage = {
    posts: [] as PostType[],
    newPostsText: '',
    profile: null
}

type ProfileReducerType = typeof profilePage

type AddPostActionType = {
    type: typeof ADD_POST,
    newPostsText: string
}

type UpdateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}

type SetUserProfileType = {
    type:typeof SET_USER_PROFILE,
    profile:any
}


type ProfileReducerActionTypes = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof setUserProfile>


export const profileReducer = (state: ProfileReducerType = initialState, action: ProfileReducerActionTypes): ProfileReducerType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostsText,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostsText: ''}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostsText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const addPostActionCreator = (newPostsText: string): AddPostActionType => {
    return {
        type: ADD_POST,
        newPostsText: newPostsText
    } as const
}

export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
}

export const setUserProfile = (profile: any): SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    } as const
}

export const getUserProfile = (userId: number) => (dispatch:Dispatch) =>{
    usersAPI.getProfile(userId).then (responce => {
        dispatch(setUserProfile(responce.data))
    })
}