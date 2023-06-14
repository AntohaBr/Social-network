import React, {FC, useState} from 'react'
import s from './Profile-info.module.css'
import {Preloader} from '../../Common/Preloader/Preloader'
import {ProfileStatus} from 'Components/Profile/Profile-info/Profile-status/Profile-status'
import {ProfileDataFormWithReduxForm} from './Profile-data-form'
import {ProfileType, saveProfile} from 'Redux/Profile-reducer'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectProfile} from 'Store/Selectors'
import {ProfileData} from 'Components/Profile/Profile-info/Profile-data/Profile-data'
import {ProfilePhoto} from 'Components/Profile/Profile-info/Profile-photo/Profile-photo'

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

    const onSubmit = async (formData: ProfileType) => {
        // await props.saveProfile(formData)
        await dispatch(saveProfile(formData))
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <ProfilePhoto isOwner={isOwner}/>
                <ProfileStatus/>
                {editMode
                    ? <ProfileDataFormWithReduxForm initialValues={profile}
                                                    onSubmit={onSubmit}
                                                    profile={profile}/>
                    : <ProfileData isOwner={isOwner}
                                   goToEditMode={goToEditModeHandler}/>
                }
            </div>
        </div>
    )
}
