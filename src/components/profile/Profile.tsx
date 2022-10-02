import React from 'react';
import ProfileInfo from "./profikeInfo/ProfileInfo";
import MyPostsContainer from "./my posts/MyPostsContainer";

const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;