import React, {FC} from 'react'
import {maxLengthCreator, required} from "Utils/Validators/Validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "Components/Common/Forms-control/Forms-control";
import {useAppDispatch, useAppSelector} from "Utils/Hooks";
import {selectProfileNewPostText} from "Store/Selectors";
import {profileActions} from "Redux/Profile-reducer";

type NewPostsFormType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

export const AddNewPostsForm: React.FC<InjectedFormProps<NewPostsFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea}
                       validate={[required, maxLength10]} placeholder={'Post Message'}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const PostsForm = reduxForm<NewPostsFormType>({form: 'profileAddNewPostsForm'})(AddNewPostsForm)