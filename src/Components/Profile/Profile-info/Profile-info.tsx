import React, {ChangeEvent, useState} from 'react'
import s from './Profile-info.module.css'
import {Preloader} from '../../Common/Preloader/Preloader'
import {ProfileStatusWithHooks} from './Profile-status-with-hooks'
import userPhoto from '../../../Assets/Images/Avatar.jpg'
import {ProfileDataFormWithReduxForm} from './Profile-data-form'
import {ContactsType, ProfileType} from '../../../Redux/Profile-reducer'


type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileType) => void
}


export const ProfileInfo = (props: ProfileInfoType) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        await props.saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onPhotoSelected}/>}
                {editMode
                    ? <ProfileDataFormWithReduxForm initialValues={props.profile}
                                                    onSubmit={onSubmit}
                                                    profile={props.profile}
                    />
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}
                    />
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}


type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}


const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div>
                <b>Fill name</b>:{profile?.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile?.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile?.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile?.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile?.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key}
                                contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactsType]}
                />
            })}
            </div>
        </div>
    )
}

export const Contact = ({contactTitle, contactValue}: { contactTitle: string, contactValue: string }) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}