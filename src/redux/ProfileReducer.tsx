import {ActionTypes, PostType,} from "./Store";


const initialState = {
        posts: [
            {id: 1, message: 'Hi, how a you?', likesCount: 12},
            {id: 2, message: 'It`s my first post', likesCount: 10}
        ],
        newPostsText: 'it-kamasutra.com',
    }

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profilePage={
    posts: [] as Array<PostType>,
    newPostsText:''
}

type ProfileReducerType = typeof profilePage

type AddPostActionType={
    type: typeof  ADD_POST,
    newPostsText:string
}

type UpdateNewPostTextActionType={
    type: typeof  UPDATE_NEW_POST_TEXT,
    newText: string
}


export const profileReducer = ( state: ProfileReducerType = initialState, action:ActionTypes): ProfileReducerType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostsText,
                likesCount: 0
            };
            return {...state,posts:[...state.posts,newPost],newPostsText:''}
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state,newPostsText:action.newText}
        }
        default:
            return state;

    }
};

export const addPostActionCreator = (newPostsText: string):AddPostActionType => {
    return {
        type: ADD_POST,
        newPostsText:newPostsText
    } as const
};

export const updateNewPostTextActionCreator = (newText: string):UpdateNewPostTextActionType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    } as const
};