import React, {FC, useState} from 'react'
import s from './Post.module.css'
import {useAppSelector} from 'Utils/Hooks'
import {selectProfilePhotosSmall} from 'Store/Selectors'
import defaultUserPhoto from 'Assets/Images/defaultUserPhoto.jpg'

type  PostPropsType = {
    message: string,
    likesCount: number
}

export const Post: FC<PostPropsType> = ({message, likesCount}) => {
    const userPhoto = useAppSelector(selectProfilePhotosSmall)

    const [like, setLike] = useState(likesCount)
    const [putLike, setPutLike] = useState(false)

    const onClickLikeHandler = () => {
        setPutLike(!putLike)

        if (putLike) {
            setLike(like - 1)
        } else {
            setLike(like + 1)
        }
    }

    return (
        <div className={s.item}>
            <img alt='userPhoto' src={userPhoto ? userPhoto : defaultUserPhoto}/>
            {message}
            <div>
                <button onClick={onClickLikeHandler}>
                    <span>{like}</span>
                </button>
            </div>
        </div>
    )
}

