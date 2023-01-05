import {authAPI} from '../api/api'
import {Dispatch} from 'redux'
import {stopSubmit} from "redux-form";


const initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as string | null,
    isAuth: false as boolean
}


export const authReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state,
                ...action.payload}
        default:
            return state
    }
}


export const setAuthUserDataAC = (email: string | null, login: string | null, id: string | null, isAuth: boolean) =>
    ({type: 'SET_USER_DATA', payload: {email, login, id, isAuth}} as const)


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                const {email, login, id} = res.data
                dispatch(setAuthUserDataAC(email, login, id, true))
            }
        })
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                dispatch(getAuthUserDataTC())
            }
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    authAPI.logOut()
        .then(res =>{
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null,null,null,false))
            }
            else {
                let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Common error'
                dispatch(stopSubmit('login',{_error: message }))
            }
        })
}

type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setAuthUserDataAC>
