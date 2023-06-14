import React from 'react'
import s from './My-posts.module.css'
import {Post} from './Post/Post'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Textarea} from "../../Common/Forms-control/Forms-control"
import {maxLengthCreator, required} from "Utils/Validators/Validators"
import {addPost} from 'Redux/Profile-reducer'
import {useAppDispatch, useAppSelector} from "Utils/Hooks";
import {selectProfilePosts} from "Store/Selectors";

export const MyPosts = React.memo(() => {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectProfilePosts)
    const postsElement = posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const addPostHandler = (newPostsText: string) => {
        dispatch(addPost(newPostsText))
    }

    const onAddPost = (values: NewPostsFormType) => {
        addPostHandler(values.newPostText)
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
});


type NewPostsFormType = {
    newPostText: string
}


const maxLength10 = maxLengthCreator(10)

export const AddNewPostsForm: React.FC<InjectedFormProps<NewPostsFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea}
                       validate={[required, maxLength10]} placeholder={'Post Message'}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostsFormRedux = reduxForm<NewPostsFormType>({form: 'profileAddNewPostsForm'})(AddNewPostsForm)