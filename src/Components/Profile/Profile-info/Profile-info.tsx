import React, {ChangeEvent, FC, useState} from 'react'
import s from './Profile-info.module.css'
import {Preloader} from '../../Common/Preloader/Preloader'
import {ProfileStatus} from 'Components/Profile/Profile-info/Profile-status/Profile-status'
import defaultUserPhoto from 'Assets/Images/defaultUserPhoto.jpg'
import {ProfileDataFormWithReduxForm} from './Profile-data-form'
import {ProfileType, savePhoto, saveProfile} from 'Redux/Profile-reducer'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectProfile, selectProfilePhotosSmall} from 'Store/Selectors'
import {ProfileData} from 'Components/Profile/Profile-info/Profile-data/Profile-data'


type ProfileInfoType = {
    isOwner: boolean
}

export const ProfileInfo: FC<ProfileInfoType> = ({isOwner}) => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)
    const userPhoto = useAppSelector(selectProfilePhotosSmall)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    // const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length) {
    //         props.savePhoto(e.target.files[0])
    //         // dispatch(savePhoto(e.target.files[0]))
    //     }
    // }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(savePhoto(e.currentTarget.files[0]))
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        // await props.saveProfile(formData)
        await dispatch(saveProfile(formData))
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={userPhoto || defaultUserPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onPhotoSelected}/>}
                {/*{editMode*/}
                {/*    ? <ProfileDataFormWithReduxForm initialValues={profile}*/}
                {/*                                    onSubmit={onSubmit}*/}
                {/*                                    profile={profile}*/}
                {/*    />*/}
                {/*    // : <ProfileData profile={profile}*/}
                {/*    //                isOwner={isOwner}*/}
                {/*    //                goToEditMode={() => {*/}
                {/*    //                    setEditMode(true)*/}
                {/*    //                }}*/}
                {/*    // />*/}
                {/*}*/}
                <ProfileData isOwner={isOwner}
                             goToEditMode={() => {
                                 setEditMode(true)
                             }}/>
                <ProfileStatus/>
            </div>
        </div>
    )
}
