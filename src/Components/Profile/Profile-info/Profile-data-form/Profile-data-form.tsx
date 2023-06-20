import React, {FC} from 'react'
import {Field, Form} from 'react-final-form'
import {useAppSelector} from 'Utils'
import {selectAuthId, selectProfile} from 'Store/Selectors'
import {ProfileType} from 'Redux/Profile-reducer/Profile-reducer'

type ProfileDataFormPropsType = {
    onSubmitData: (formData: ProfileType) => void
}

export const ProfileDataForm: FC<ProfileDataFormPropsType> = ({onSubmitData}) => {
    const profile = useAppSelector(selectProfile)
    const isMyProfile = useAppSelector(selectAuthId)

    const onSubmit = (values: ProfileType) => {
        onSubmitData(values)
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                fullName: profile?.fullName,
                lookingForAJob: profile?.lookingForAJob,
                lookingForAJobDescription: profile?.lookingForAJobDescription,
                aboutMe: profile?.aboutMe
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name</label>
                        <Field
                            name='fullName'
                            component='input'
                            type='text'
                            placeholder='full name'
                        />
                    </div>
                    <div>
                        <label>Looking for a job:</label>
                        <Field
                            name='lookingForAJob'
                            autoFocus={true}
                            component='input'
                            type='checkbox'
                        />
                    </div>
                    <div>
                        <label>My professional skills:</label>
                        <Field
                            name='lookingForAJobDescription'
                            component='textarea'
                            type='text'
                        />
                    </div>
                    <div>
                        <label>About me:</label>
                        <Field
                            name='aboutMe'
                            component='textarea'
                            type='text'
                        />
                    </div>
                    {isMyProfile &&
                        <div>
                            <button type="submit">Save</button>
                        </div>
                    }
                </form>
            )
            }
        />
    )
}

//types
export type UpdateProfileType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}


//             <div>
//                 <b>Contacts</b>: {Object.keys(profile?.contacts as { [key: string]: string }).map((key) => {
//                 return <div key={key} className={s.contact}>
//                     {/*<div>{key}: {createField(key, 'contacts.' + key, [], Input)}</div>*/}
//                 </div>
//             })}
//             </div>
