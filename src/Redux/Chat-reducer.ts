import {AppDispatchType, AppThunkType, InferActionsTypes} from 'Store/Store'
import {chatAPI, ChatMessageType, StatusType} from 'Api/Chat-api'

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

//reducers
export const chatReducer = (state: ChatInitialStateType = initialState, action: ChAtReducerActionType): ChatInitialStateType => {
    switch (action.type) {
        case 'Chat/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.messages]}
        case 'Chat/STATUS_CHANGED':
            return {...state, status: action.status}
        default:
            return state
    }
}

//thanks
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newChatMessageHandler = (dispatch: AppDispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(chatActions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandler = (dispatch: AppDispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(chatActions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startChatMessages = (): AppThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messageReceived', newChatMessageHandler(dispatch))
    chatAPI.subscribe('statusChanged', statusChangedHandler(dispatch))
}

export const stopChatMessages = (): AppThunkType => async (dispatch) => {
    chatAPI.subscribe('messageReceived', newChatMessageHandler(dispatch))
    chatAPI.subscribe('statusChanged', statusChangedHandler(dispatch))
}

export const sendMessage = (message: string): AppThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

//actions
export const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'Chat/MESSAGES_RECEIVED', messages} as const),
    statusChanged: (status: StatusType) => ({type: 'Chat/STATUS_CHANGED', status} as const)
}

//types
export type ChatInitialStateType = typeof initialState
export type ChAtReducerActionType = InferActionsTypes<typeof chatActions>

