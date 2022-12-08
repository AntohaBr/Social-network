import React from 'react';
import ProfileInfo from './profikeInfo/ProfileInfo';
import {MyPostsContainer} from './my posts/MyPostsContainer';


type ProfileType={
    profile:null
}


export const Profile = (props:ProfileType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}
