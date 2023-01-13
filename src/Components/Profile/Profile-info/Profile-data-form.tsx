import React from 'react'
import {createField, Input, Textarea} from '../../Common/Forms-control/Forms-control'
import {IMainUser} from '../../../Redux/Profile-reducer'
import {reduxForm} from 'redux-form'
import s from '../../Common/Forms-control/Forms-control.module.css'


type ProfileDataFormPropsType = {
    profile: IMainUser | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: any) => void
    handleSubmit: () => void
    error: string
}


export const ProfileDataForm = (props:ProfileDataFormPropsType) => {
    return (
        <form action='' onSubmit={props.handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            { props.error && <div className={s.formSummaryError}>{props.error}</div>}
            <div>
                <b>Fill name</b>:
                {createField('Fill name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField('My professional skills', 'lookingForAJobDescription', [], Input,Textarea)}
            </div>
            <div>
                <b>About me</b>:  {createField('About me', 'aboutMe', [], Input, Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(props.profile?.contacts as { [key: string]: string }).map((key) => {
                return <div key={key} className={s.contact}>
                    <div>{key}: {createField(key, 'contacts.' + key, [], Input)}</div>
                </div>
            })}
            </div>
        </form>
    )
}

export const ProfileDataFormWithReduxForm = reduxForm<any, any>({form: 'profileEdit'})(ProfileDataForm)