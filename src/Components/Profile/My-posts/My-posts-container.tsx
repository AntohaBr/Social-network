import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {addPost, PostType} from 'Redux/Profile-reducer'
import {AppStateType} from 'Store/Store'
import {MyPosts} from './My-posts'


type MapStateToPropsType = {
    posts: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostsText: string) => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        addPost: (newPostsText: string) => {
            dispatch(addPost(newPostsText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

