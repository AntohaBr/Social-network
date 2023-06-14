import React, {ChangeEvent, FC} from 'react'
import defaultUserPhoto from 'Assets/Images/defaultUserPhoto.jpg'
import s from 'Components/Profile/Profile-info/Profile-info.module.css'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectProfilePhotosSmall} from 'Store/Selectors'
import {savePhoto} from 'Redux/Profile-reducer'

type ProfilePhotoPropsType = {
    isOwner: boolean
}

export const ProfilePhoto: FC<ProfilePhotoPropsType> = ({isOwner}) => {
    const dispatch = useAppDispatch()
    const userPhoto = useAppSelector(selectProfilePhotosSmall)

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(savePhoto(e.currentTarget.files[0]))
        }
    }

    return (
        <div>
            <img src={userPhoto ? userPhoto : defaultUserPhoto} className={s.mainPhoto}/>
            {isOwner && <input type={'file'} onChange={onPhotoSelected}/>}
        </div>
    )
}