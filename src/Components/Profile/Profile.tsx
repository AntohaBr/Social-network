import React from 'react'
import {ProfileType} from '../../Redux/Profile-reducer'
import {ProfileInfo} from './Profile-info/Profile-info'
import {MyPostsContainer} from './My-posts/My-posts-container'


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileType) => void
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
            />
            <MyPostsContainer/>
        </div>
    )
}
