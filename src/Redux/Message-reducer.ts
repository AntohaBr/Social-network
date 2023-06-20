import {InferActionsTypes} from 'Store/Store'

const initialState = {
    dialogs: [
        {dialogId: 1, nameUser: 'Anton'},
        {dialogId: 2, nameUser: 'Igor'},
        {dialogId: 3, nameUser: 'Sasha'},
        {dialogId: 4, nameUser: 'Lena'},
        {dialogId: 5, nameUser: 'Masha'},
        {dialogId: 6, nameUser: 'Ira'}
    ],
    messages: [
        {messageId: 1, message: 'Hi'},
        {messageId: 2, message: 'Ha Ha'},
        {messageId: 3, message: 'Yo'},
        {messageId: 4, message: 'Yo'},
        {messageId: 5, message: 'Yo'},
        {messageId: 6, message: 'Yo'}
    ],
    newMessageText: ''
}

//reducers
export const messageReducer = (state: InitialStateType = initialState, action: MessageReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'message/SEND_MESSAGE':
            const newMessage: MessageType = {
                messageId: new Date().getTime(),
                message: state.newMessageText
            }
            return {...state, messages: [...state.messages, newMessage], newMessageText: ''}
        case 'message/UPDATED_MESSAGE_TEXT':
            return {...state, newMessageText: action.updatedMessageText}
        default:
            return state
    }
}

//actions
export const messageActions = {
    sendMessage: () => ({type: 'message/SEND_MESSAGE'} as const),
    updateNewMessage: (updatedMessageText: string) => ({type: 'message/UPDATED_MESSAGE_TEXT', updatedMessageText} as const)
}

//types
export type InitialStateType = typeof initialState
export type MessageReducerActionType = InferActionsTypes<typeof messageActions>
export type MessageType = {
    messageId: number,
    message: string
}