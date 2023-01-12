import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import {Preloader} from '../../common/Preloader/Preloader'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks'
import userPhoto from "../../../assets/images/Foto.png"
import {ProfileDataFormWithReduxForm} from "./ProfileDataForm"
import {IMainUser} from '../../../redux/Profile-reducer'


type ProfileInfoType = {
    profile: IMainUser | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: any) => void
    saveProfile: (data: any) => void
    error: string
}

export const ProfileInfo = (props: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: FormData) => {
        await props.saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos?.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onPhotoSelected}/>}
                {editMode
                    ? <ProfileDataFormWithReduxForm  initialValues={props.profile}
                                                     onSubmit={onSubmit}
                                                     profile={props.profile}
                                                     tatus={props.status}
                                                     savePhoto={props.savePhoto}
                                                     isOwner={props.isOwner}
                                                     updateStatus={props.updateStatus}
                    />
                    : <ProfileData profile={props.profile}
                                   status={props.status}
                                   updateStatus={props.updateStatus}
                                   isOwner={props.isOwner}
                                   savePhoto={props.savePhoto}
                                   goToEditMode={() => {setEditMode(true)}}
                    />
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}


type ProfileDataPropsType = {
    profile: IMainUser | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: any) => void
    goToEditMode: () => void
}

const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <div>
            {props.isOwner && <div>
                <button onClick={props.goToEditMode}>Edit</button>
            </div>}
            <div>
                <b>Fill name</b>:{props.profile?.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {props.profile?.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {props.profile?.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {props.profile?.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {props.profile?.aboutMe}
            </div>
            <div>
            {/*    <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {*/}
            {/*    return <Contact key={key}*/}
            {/*                    contactTitle={key}*/}
            {/*                    contactValue={props.profile.contacts[key]}*/}
            {/*    />*/}
            {/*})}*/}
            </div>
        </div>
    )
}

// export const Contact = ({contactTitle, contactValue}) => {
//     return <div className={s.contact}>
//         <b>{contactTitle}</b>: {contactValue}
//     </div>
// }