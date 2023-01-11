import React from 'react'
import {MyPostsContainer} from './my posts/MyPostsContainer'
import {ProfileInfo} from './profikeInfo/ProfileInfo'
import {ResponseProfileType} from "../../redux/Profile-reducer";


type ProfileType={
    profile: ResponseProfileType  | null
    status : string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: any) => void
}


export const Profile = (props:ProfileType) => {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}
