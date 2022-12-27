import React from 'react';
import s from './MyPosts.module.css';
import Post from './post/Post';
import {MyPostsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type PostsType = MyPostsType


 export const MyPosts = (props: PostsType) => {

    const postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = (values: NewPostsFormType) => {
       props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
           <AddNewPostsFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
};


type NewPostsFormType = {
    newPostText: string
}

export const AddNewPostsForm: React.FC<InjectedFormProps<NewPostsFormType>> = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'newPostText'} component={'textarea'}/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

const AddNewPostsFormRedux = reduxForm<NewPostsFormType>({form:'profileAddNewPostsForm'}) (AddNewPostsForm)