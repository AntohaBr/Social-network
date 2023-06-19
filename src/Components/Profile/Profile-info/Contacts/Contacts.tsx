import React from 'react'
import s from 'Components/Profile/Profile-info/Profile-info.module.css'
import {useAppSelector} from 'Utils'
import {selectProfile} from 'Store/Selectors'
import {ContactsResponseType} from 'Redux/Profile-reducer'

export const Contacts = () => {
    const profile = useAppSelector(selectProfile)

    return (
        <div>
            {profile.contacts && Object.keys(profile.contacts).map((key: string) => {
                return (
                    <div key={key} className={s.contact}>
                        <b>{key}</b>: {profile.contacts [key as keyof ContactsResponseType]}
                    </div>
                )
            })}
        </div>
    )
}
