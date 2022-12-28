import React from 'react';
import s from './Dialogs.module.css';
import {DialogsType} from './DialogsContainer';
import {Message} from './message/Message';
import {DialogItem} from './dialogItem/DialogsItem';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/Validators/Validators";



export const Dialogs = (props: DialogsType) => {
    const state = props.messagePage
    const dialogsElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    const messagesElement = state.messages.map(m => <Message messages={m.message} key={m.id}/>)

    const addNewDialogs = (values: DialogsFormType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <AddDialogsFormRedux onSubmit={addNewDialogs}/>
            </div>
        </div>
    )
}


type DialogsFormType = {
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50)

export const AddDialogsForm: React.FC<InjectedFormProps<DialogsFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} name={'newMessageBody'} component={Textarea}
                       validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddDialogsFormRedux = reduxForm<DialogsFormType>({form: 'addDialogForm'})(AddDialogsForm)
