import React from 'react';
import s from './Post.module.css';


type  postType={
    message: string,
    likesCount: number
}

const Post = (props:postType) => {
    return (
        <div className={s.item}>
            <img src="https://avatars.mds.yandex.net/i?id=34ea1a7ec13805662fd313a1f4f7819b-6365519-images-thumbs&n=13"/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>

    );
}

export default Post;