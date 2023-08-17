import React, {FC, memo} from 'react'
import s from './My-posts.module.css'
import {Post, PostsForm} from 'Components/Profile'
import {useAppSelector} from 'Utils'
import {selectProfilePosts} from 'Store/Selectors'

export const MyPosts: FC = memo(() => {
        const posts = useAppSelector(selectProfilePosts)

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <PostsForm/>
                <div className={s.posts}>
                    {posts.map(p => <Post key={p.postId}
                                          message={p.message}
                                          likesCount={p.likesCount}/>)}
                </div>
            </div>
        )
    }
)


