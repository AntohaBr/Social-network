import {authAPI, securityAPI} from 'Api'
import {stopSubmit} from 'redux-form'
import {AppThunkType} from 'Store/Store'
import {LoginDataType, ResultCodeEnum} from 'Api/Auth-api'

const initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as number | null,
    isAuth: false as boolean,
    captchaURL: null as null | string
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
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {...state, captchaURL: action.captchaURL}
        default:
            return state
    }
}

//thanks
export const getAuthUser = (): AppThunkType => async (dispatch) => {
    const {data} = await authAPI.getAuth()
    if (data.resultCode === 0) {
        const {id, login, email} = data.data
        dispatch(setAuth(id, login, email, true))
    }
}

export const login = (data: LoginDataType): AppThunkType => async (dispatch) => {
        const res = await authAPI.login(data)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUser())
        } else {
            // if (data.resultCode === 10) {
            //     dispatch(getCaptchaURL())
            // }
            // const message = data.messages.length > 0 ? data.messages[0] : 'Common error'
            // dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const logOut = (): AppThunkType => async (dispatch) => {
    const res = await authAPI.logOut()
    if (res.data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
}

export const getCaptchaURL = (): AppThunkType => async (dispatch) => {
    const res = await securityAPI.getCaptchaURL()
    const captchaURL = res.data.url
    dispatch(getCaptchaURLSuccess(captchaURL))
}

//actions
export const setAuth = (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
    ({type: 'auth/SET_USER_DATA', payload: {email, login, id, isAuth}} as const)
export const getCaptchaURLSuccess = (captchaURL: string | null) => ({
    type: 'auth/GET_CAPTCHA_URL_SUCCESS', captchaURL} as const)

//types
type initialStateType = typeof initialState
export type AuthReducerActionType =
    ReturnType<typeof setAuth> |
    ReturnType<typeof getCaptchaURLSuccess>
