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


export type InitialStateType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessagesType>,
    newMessageBody: string
}


// type MessageReducerActionType= UpdateNewMessageBodyActionType | SendMessageActionType
export const messageReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case  'UPDATE_NEW_MESSAGE_BODY':
            return {...state,newMessageBody: action.body}
        case 'SEND_MESSAGE':
            let body = state.newMessageBody
            return {...state,newMessageBody:'',messages:[...state.messages,{id: 7, message: body}]}
        default:
            return state
    }
}


export const updateNewMessageBodyAC = (body:string) => ({type: 'UPDATE_NEW_MESSAGE_BODY', body} as const)
export const sendMessageAC = () => ({type: 'SEND_MESSAGE'} as const)

