import React from 'react';
import s from './MyPosts.module.css';
import Post from './post/Post';
import {MyPostsType} from "./MyPostsContainer";


type PostsType = MyPostsType


 const MyPosts = (props: PostsType) => {
    let postsElement = props.posts.map(p => <Post
        message={p.message}
        likesCount={p.likesCount}
    />)
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        let text = newPostElement.current?.value;
        text && props.addPost(text)
    };

    const onPostChange=()=>{
        let text=newPostElement.current?.value;
        text && props.updateNewPostText(text);
    };
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostsText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
};

export default MyPosts;