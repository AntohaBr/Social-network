import {AuthMeDataType} from "../api/api";


const initialState = {
    id: 1,
    email: '' as string,
    login: '' as string,
    isAuth: false
}


type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setAuthUserDataAC>


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


export const setAuthUserDataAC = (data: AuthMeDataType) => ({type: 'SET_USER_DATA', data} as const)

