import React from 'react';
import {PostType, RootStateType} from "../../../redux/Store";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";


export type MyPostsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    posts: Array<PostType>
    newPostsText: string
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: (newPostsText: string) => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostsText: state.profilePage.newPostsText
    }
}

let mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        },
        addPost: (newPostsText: string) => {
            dispatch(addPostActionCreator(newPostsText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;