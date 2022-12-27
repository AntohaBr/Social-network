import {authAPI, ResponseAuthMeType} from '../api/api'
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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}


const setAuthUserDataAC = (data: ResponseAuthMeType) => ({type: 'SET_USER_DATA', data} as const)


export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(res.data))
            }
        })
}


type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setAuthUserDataAC>
