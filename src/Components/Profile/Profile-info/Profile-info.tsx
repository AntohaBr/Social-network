import React, {FC, useState} from 'react'
import s from './Profile-info.module.css'
import {Preloader} from 'Common'
import {ProfileType, saveProfile} from 'Redux/Profile-reducer/Profile-reducer'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectProfile} from 'Store/Selectors'
import {ProfileStatus, ProfilePhoto, ProfileData, ProfileDataForm} from 'Components/Profile/Profile-info'

type ProfileInfoPropsType = {
    isOwner: boolean
}

export const ProfileInfo: FC<ProfileInfoPropsType> = ({isOwner}) => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(selectProfile)

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const goToEditModeHandler = () => {
        setEditMode(true)
    }

    const onSubmitData = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <ProfilePhoto isOwner={isOwner}/>
                <ProfileStatus/>
                {editMode
                    ? <ProfileDataForm onSubmitData={onSubmitData}/>
                    : <ProfileData isOwner={isOwner}
                                   goToEditMode={goToEditModeHandler}/>
                }
            </div>
        </div>
    )
}
