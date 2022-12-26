import React from 'react';
import ProfileInfo from './profikeInfo/ProfileInfo';
import {MyPostsContainer} from './my posts/MyPostsContainer';
import {ResponseProfileType} from "../../api/api";


type ProfileType={
    profile: ResponseProfileType  | null
    status : string
    updateStatus: (status: string) => void
}


export const Profile = (props:ProfileType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer/>
        </div>
    )
}
