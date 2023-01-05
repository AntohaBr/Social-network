import React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {addPostAC, PostType} from "../../../redux/Profile-reducer";
import {AppStateType} from "../../../redux/Redux-store";
import {MyPosts} from "./MyPosts";


export type MyPostsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    posts: PostType[]
    newPostsText: string
}

type MapDispatchToPropsType = {
    addPost: (newPostsText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostsText: state.profilePage.newPostsText
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        addPost: (newPostsText: string) => {
            dispatch(addPostAC(newPostsText))
        }
    }
}


export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

