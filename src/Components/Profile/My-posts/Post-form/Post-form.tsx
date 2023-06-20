import React from 'react'
import { useForm } from "react-hook-form";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "Common/Forms-control/Forms-control";
import {useAppDispatch, useAppSelector} from "Utils/Hooks";
import {selectProfileNewPostText} from "Store/Selectors";
import {profileActions} from "Redux/Profile-reducer/Profile-reducer";

type NewPostsFormType = {
    newPostText: string
}


//
// export const PostsForm: React.FC<InjectedFormProps<NewPostsFormType>> = (props) => {
//
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field name={'newPostText'} component={Textarea}
//                        validate={[required, maxLength10]} placeholder={'Post Message'}
//                 />
//             </div>
//             <div>
//                 <button>Add post</button>
//             </div>
//         </form>
//     )
// }
//
// export const PostsForm = reduxForm<NewPostsFormType>({form: 'profileAddNewPostsForm'})(AddNewPostsForm)