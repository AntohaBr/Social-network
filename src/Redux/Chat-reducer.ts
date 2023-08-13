import {AppDispatchType, AppThunkType, InferActionsTypes} from 'Store/Store'
import {chatAPI, ChatMessageType} from 'Api/Chat-api'

const initialState = {
    messages: [] as ChatMessageType[],
}

//reducers
export const chatReducer = (state: ChatInitialStateType = initialState, action: ChAtReducerActionType): ChatInitialStateType => {
    switch (action.type) {
        case 'Chat/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.messages]}

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

export const startChatMessages = (): AppThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newChatMessageHandler(dispatch))
}

export const stopChatMessages = (): AppThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newChatMessageHandler(dispatch))
}

export const sendMessage = (message: string): AppThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

//actions
export const chatActions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'Chat/MESSAGES_RECEIVED', messages} as const),
}

//types
export type ChatInitialStateType = typeof initialState
export type ChAtReducerActionType = InferActionsTypes<typeof chatActions>
