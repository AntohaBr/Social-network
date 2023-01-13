import React from 'react'
import s from './Dialogs.module.css'
import {DialogsType} from './Dialogs-container'
import {Message} from './Message/Message'
import {DialogItem} from './Dalog-item/Dialogs-item'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Textarea} from '../Common/Forms-control/Forms-control'
import {maxLengthCreator, required} from '../../Utils/Validators/Validators'


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
                <Field placeholder={'Enter your Message'} name={'newMessageBody'} component={Textarea}
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
