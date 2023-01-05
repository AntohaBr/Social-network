import {authAPI} from '../api/api'
import {Dispatch} from 'redux'


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


const setAuthUserDataAC = (email: string | null, login: string | null, id: string | null, isAuth: boolean) =>
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
        })
}

type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setAuthUserDataAC>
