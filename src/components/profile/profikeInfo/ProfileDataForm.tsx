import React from 'react'
import {createField, Input, Textarea} from '../../common/FormsControl/FormsControl'
import {ResponseProfileType} from '../../../redux/Profile-reducer'
import {reduxForm} from "redux-form";


type ProfileDataFormPropsType = {
    profile: ResponseProfileType | null
    handleSubmit: () => void

}


export const ProfileDataForm = (props:ProfileDataFormPropsType) => {
    return (
        <form action='' onSubmit={props.handleSubmit}>
            <div>
                <button onClick={() => {
                }}>Save
                </button>
            </div>
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
            {/*    <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {*/}
            {/*    return <Contact key={key}*/}
            {/*                    contactTitle={key}*/}
            {/*                    contactValue={props.profile.contacts[key]}*/}
            {/*    />*/}
            {/*})}*/}
            </div>
        </form>
    )
}

export const ProfileDataFormWithReduxForm = reduxForm<any, any>({form: 'profileEdit'})(ProfileDataForm)