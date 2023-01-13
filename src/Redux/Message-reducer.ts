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


//reducers
export const messageReducer = (state: InitialStateType = initialState, action: MessageReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'Message/SEND_MESSAGE':
            let body = action.newMessageBody
            return {...state,messages:[...state.messages,{id: 7, message: body}]}
        default:
            return state
    }
}


//actions
export const sendMessageAC = (newMessageBody:string) => ({type: 'Message/SEND_MESSAGE', newMessageBody} as const)


//types
export type InitialStateType = typeof initialState
export type MessageReducerActionType= ReturnType<typeof sendMessageAC>
