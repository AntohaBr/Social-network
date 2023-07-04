import {getAuthUser} from './Auth-reducer'
import {AppThunkType, InferActionsTypes} from 'Store/Store'
import {handleServerNetworkError} from 'Utils'

const initialState = {
    initialized: false,
    status: 'idle' as AppStatusType,
    profileId: 1 as number,
    error: null as null | string,
    successMessage: null as null | string,
}

//reducers
export const appReducer = (state: initialStateType = initialState, action: AppReducerActionType): initialStateType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {...state, initialized: action.isInitialized}
        case 'app/SET_STATUS':
            return {...state, status: action.status}
        case 'app/SET_PROFILE_ID':
            return {...state, profileId: action.id}
        case 'app/SET_ERROR':
            return {...state, error: action.error}
        case 'app/SET_SUCCESS_MESSAGE':
            return {...state, successMessage: action.successMessage}
        default:
            return state
    }
}

//thanks
export const initializeApp = (): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        let promise = dispatch(getAuthUser())
        Promise.all([promise])
            .then(() => {
                dispatch(appActions.setInitialized(true))
                dispatch(appActions.setAppStatus('success'))
            })
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

//actions
export const appActions = {
    setInitialized: (isInitialized: boolean) => ({type: 'app/SET_INITIALIZED', isInitialized} as const),
    setAppStatus: (status: AppStatusType) => ({type: 'app/SET_STATUS', status} as const),
    setProfileId: (id: number) => ({type: 'app/SET_PROFILE_ID', id} as const),
    setAppError: (error: null | string) => ({type: 'app/SET_ERROR', error} as const),
    setAppSuccessMessage: (successMessage: null | string) => ({
        type: 'app/SET_SUCCESS_MESSAGE',
        successMessage
    } as const)
}

//types
type initialStateType = typeof initialState
export type AppReducerActionType = InferActionsTypes<typeof appActions>
export type AppStatusType = 'idle' | 'loading' | 'success' | 'error'