import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://img1.fonwall.ru/o/tk/tropiki-more-plyazh-ycsf.jpg?route=mid&amp;h=750"/>
            </div>
            <div className={s.descriptionBlock}>
                ava+description
            </div>
        </div>
    );
}

export default ProfileInfo;