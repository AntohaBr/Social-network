import React, {FC} from 'react'
import {Contact} from 'Components/Profile/Profile-info/Contact/Contact'
import {ContactsResponseType} from 'Redux/Profile-reducer'
import {useAppSelector} from "Utils/Hooks";
import {selectProfile} from "Store/Selectors";

type ProfileDataPropsType = {
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: FC<ProfileDataPropsType> = ({isOwner, goToEditMode}) => {
    const profile = useAppSelector(selectProfile)

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
                <b>Contacts</b>:
                {/*<Contact/>*/}
            {/*    {Object.keys(profile.contacts).map(key => {*/}
            {/*    return <Contact key={key}*/}
            {/*                 contactTitle={key}*/}
            {/*                 contactValue={profile.contacts[key as keyof ContactsResponseType]}/>*/}

            {/*})}*/}
            </div>
        </div>
    )
}
