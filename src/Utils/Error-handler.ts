import {appActions} from 'Redux/App-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from 'Api/Auth-api'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ReturnType<typeof appActions.setAppError>
    | ReturnType<typeof appActions.setAppStatus>>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError( data.messages[0]))
    }
    else {
        dispatch(appActions.setAppError('Some error occurred'))
    }
    dispatch(appActions.setAppStatus('error'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<ReturnType<typeof appActions.setAppError>
    | ReturnType<typeof appActions.setAppStatus>>) => {
    dispatch(appActions.setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(appActions.setAppStatus('error'))
}