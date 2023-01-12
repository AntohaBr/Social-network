import {authAPI} from '../api/api'
import {Dispatch} from 'redux'
import {stopSubmit} from 'redux-form'


const initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as string | null,
    isAuth: false as boolean
}


//reducers
export const authReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
            return {...state,
                ...action.payload}
        default:
            return state
    }
}


//actions
export const setAuth = (email: string | null, login: string | null, id: string | null, isAuth: boolean) =>
    ({type: 'auth/SET_USER_DATA', payload: {email, login, id, isAuth}} as const)


//thanks
export const getAuth = () => async (dispatch: Dispatch) => {
    const res = await authAPI.getAuth()
            if (res.data.resultCode === 0) {
                const {email, login, id} = res.data
                dispatch(setAuth(email, login, id, true))
        }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<any>) => {
    const res = await authAPI.login(email, password, rememberMe)
            if (res.data.resultCode === 0) {
                dispatch(getAuth())
        }
            else {
                const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Common error'
                dispatch(stopSubmit('login',{_error: message }))
            }
}

export const logOut = () => async (dispatch: Dispatch) => {
    const res = await authAPI.logOut()
            if (res.data.resultCode === 0) {
                dispatch(setAuth(null,null,null,false))
            }
}


//types
type initialStateType = typeof initialState
type AuthReducerActionType =
    ReturnType<typeof setAuth>
