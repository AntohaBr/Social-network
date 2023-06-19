import React, {FC} from 'react'
import {useAppSelector} from 'Utils'
import {selectProfile} from 'Store/Selectors'
import {Contacts} from 'Components/Profile/Profile-info'

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
                <div>
                    <b>My professional skills</b>: {profile?.lookingForAJobDescription}
                </div>
            <div>
                <b>About me</b>: {profile?.aboutMe}
            </div>
            <div>
                <b>Contacts</b>:
                <Contacts/>
            </div>
        </div>
    )
}
