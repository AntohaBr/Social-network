import React, {FC} from 'react'
import s from 'Components/Profile/Profile-info/Profile-info.module.css'
import {useAppSelector} from "Utils/Hooks";
import {selectProfile} from "Store/Selectors";
import {ContactsResponseType} from "Redux/Profile-reducer";

// type ContactPropsType = {
//     contactTitle: string
//     contactValue: string
// }

export const Contact = () => {
    const profile = useAppSelector(selectProfile)

    return (
        <div>
            {
                Object.keys(profile.contacts).map((key: any) => {
                    return (
                        <div className={s.contact}>
                            <b>{key}</b>: {profile.contacts [key as keyof ContactsResponseType]}
                        </div>
                    )
                })
            }
        </div>
    )
}