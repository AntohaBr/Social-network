import React from 'react'
import {createField, Input, Textarea} from '../../Common/Forms-control/Forms-control'
import {ProfileType} from 'Redux/Profile-reducer'
import {InjectedFormProps, reduxForm} from 'redux-form'
import s from '../../Common/Forms-control/Forms-control.module.css'


type ProfileDataFormPropsType = {
    profile: ProfileType
}


export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> =
    ({handleSubmit, profile, error}) => {
        return (
            <form action='' onSubmit={handleSubmit}>
                <div>
                    <button>Save</button>
                </div>
                {error && <div className={s.formSummaryError}>{error}</div>}
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
                    {createField('My professional skills', 'lookingForAJobDescription', [], Input, Textarea)}
                </div>
                <div>
                    <b>About me</b>: {createField('About me', 'aboutMe', [], Input, Textarea)}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile?.contacts as { [key: string]: string }).map((key) => {
                    return <div key={key} className={s.contact}>
                        <div>{key}: {createField(key, 'contacts.' + key, [], Input)}</div>
                    </div>
                })}
                </div>
            </form>
        )
    }

export const ProfileDataFormWithReduxForm = reduxForm<ProfileType,
    ProfileDataFormPropsType>({form: 'profileEdit'})(ProfileDataForm)