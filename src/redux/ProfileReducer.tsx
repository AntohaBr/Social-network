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


const profilePage = {
    posts: [] as PostType[],
    newPostsText: '',
    profile: null
}

type initialStateType = typeof initialState

type ProfileReducerActionTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof setUserProfileAC>


export const profileReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            const newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostsText,
                likesCount: 0
            }
            return {...state, posts: [...state.posts, newPost], newPostsText: ''}
        case 'UPDATE_NEW_POST_TEXT':
            return {...state, newPostsText: action.newText}
        case 'SET_USER_PROFILE':
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const addPostAC = (newPostsText: string) => ({type: 'ADD_POST', newPostsText} as const)
export const updateNewPostTextAC = (newText: string) => ({type: 'UPDATE_NEW_POST_TEXT', newText} as const)
export const setUserProfileAC = (profile: any) => ({type: 'SET_USER_PROFILE', profile} as const)


export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfileAC(res.data))
        })
}

//types
export type PostType = {
    id: number,
    message: string,
    likesCount: number
}