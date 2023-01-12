import React from 'react'
import {MyPostsContainer} from './my posts/MyPostsContainer'
import {ProfileInfo} from './profikeInfo/ProfileInfo'
import {IMainUser} from '../../redux/Profile-reducer'



type ProfilePropsType = {
    addPost: (newPostText: string) => void
    profile: IMainUser | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: any) => void
    saveProfile: (data: any) => void
    error: string
}


export const Profile = (props:ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                error={props.error}
            />
            <MyPostsContainer/>
        </div>
    )
}
