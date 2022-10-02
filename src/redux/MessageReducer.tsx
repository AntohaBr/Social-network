import {ActionTypes, DialogsType, MessagesType,} from "./Store";

const initialState = {
    dialogs: [
        {id: 1, name: 'Anton'},
        {id: 2, name: 'Igor'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Lena'},
        {id: 5, name: 'Masha'},
        {id: 6, name: 'Ira'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Ha Ha'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'}
    ],
    newMessageBody: ''
}

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export type InitialStateType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessagesType>,
    newMessageBody: string
}

type UpdateNewMessageBodyActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    body: string
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE
}

// type MessageReducerActionType= UpdateNewMessageBodyActionType | SendMessageActionType
const messageReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case  UPDATE_NEW_MESSAGE_BODY:
            return {...state,newMessageBody: action.body}
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {...state,newMessageBody:'',messages:[...state.messages,{id: 7, message: body}]}
        default:
            return state
    }
}

export default messageReducer;

export const updateNewMessageBodyActionCreator = (body:string): UpdateNewMessageBodyActionType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    } as const
}

export const sendMessageActionCreator = ():SendMessageActionType => {
    return {
        type: SEND_MESSAGE
    } as const
}
