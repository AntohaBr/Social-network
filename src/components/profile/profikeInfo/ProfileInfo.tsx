import React from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoType={
    profile:any
}

const ProfileInfo = (props:ProfileInfoType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <img src="https://img1.fonwall.ru/o/tk/tropiki-more-plyazh-ycsf.jpg?route=mid&amp;h=750"/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                {/*<ProfileStatus/>*/}
            </div>
        </div>
    );
}

export default ProfileInfo;