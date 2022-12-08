import React from 'react';
import {PostType, RootStateType} from "../../../redux/Store";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {addPostAC, updateNewPostTextAC} from "../../../redux/ProfileReducer";


export type MyPostsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    posts: PostType[]
    newPostsText: string
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: (newPostsText: string) => void
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostsText: state.profilePage.newPostsText
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            const action = updateNewPostTextAC(text)
            dispatch(action)
        },
        addPost: (newPostsText: string) => {
            dispatch(addPostAC(newPostsText))
        }
    }
}


export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

