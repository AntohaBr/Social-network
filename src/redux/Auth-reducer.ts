import {authAPI, RequestAuthLoginType, ResponseAuthMeType} from '../api/api'
import {Dispatch} from 'redux';


const initialState = {
    id: 1,
    login: '' as string,
    email: '' as string,
    isAuth: false
}


export const authReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state
    }
}


const setAuthUserDataAC = (payload: ResponseAuthMeType) => ({type: 'SET_USER_DATA', payload} as const)


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(res.data))
            }
        })
}

export const LoginTC = (loginData:RequestAuthLoginType) => (dispatch: Dispatch) => {
    authAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserDataTC())
            }
        })
}


type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setAuthUserDataAC>
