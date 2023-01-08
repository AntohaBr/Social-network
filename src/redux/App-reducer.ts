import {Dispatch} from 'redux'
import {getAuthUserDataTC} from "./Auth-reducer";


const initialState = {
    initialized: false
}

export const appReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const setInitializedAC = () => ({type: 'SET_INITIALIZED'} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    // dispatch(getAuthUserDataTC())
    dispatch(setInitializedAC())

}

type initialStateType = typeof initialState

type AuthReducerActionType =
    ReturnType<typeof setInitializedAC>