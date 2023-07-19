import {authAPI, securityAPI} from 'Api'
import {AppThunkType, InferActionsTypes} from 'Store/Store'
import {LoginDataType, ResultCodeEnum} from 'Api/Auth-api'
import {appActions} from 'Redux/App-reducer'
import {handleServerAppError, handleServerNetworkError} from 'Utils'

const initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as number | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

//reducers
export const authReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'auth/GET_CAPTCHA':
            return {...state, captchaUrl: action.captchaUrl}
        default:
            return state
    }
}

//thanks
export const getAuthUser = (): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const {data} = await authAPI.getAuth()
        if (data.resultCode === ResultCodeEnum.Success) {
            const {id, login, email} = data.data
            dispatch(authActions.setAuthUserData(id, login, email, true))
            dispatch(appActions.setProfileId(id))
            dispatch(appActions.setAppStatus('success'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const login = (data: LoginDataType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUser())
            dispatch(appActions.setAppStatus('success'))
            dispatch(appActions.setAppSuccessMessage('Login completed successfully'))
        } else {
            dispatch(getCaptchaURL())
            handleServerAppError(res, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const logOut = (cb?: () => void): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.logOut()
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(authActions.setAuthUserData(null, null, null, false))
            cb && cb()
            dispatch(appActions.setAppStatus('success'))
            dispatch(appActions.setAppSuccessMessage('Logout completed successfully'))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const getCaptchaURL = (): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await securityAPI.getCaptchaURL()
        const captchaUrl = res.url
        dispatch(authActions.getCaptchaURL(captchaUrl))
        dispatch(appActions.setAppStatus('success'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

//actions
export const authActions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
        ({type: 'auth/SET_USER_DATA', payload: {email, login, id, isAuth}} as const),
    getCaptchaURL: (captchaUrl: string) => ({type: 'auth/GET_CAPTCHA', captchaUrl} as const)
}

//types
type initialStateType = typeof initialState
export type AuthReducerActionType = InferActionsTypes<typeof authActions>
