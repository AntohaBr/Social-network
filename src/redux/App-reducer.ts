import {Dispatch} from 'redux'
import {authAPI} from '../api/api'


const initialState = {
    initialized: false
}


//reducers
export const appReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


//actions
const setInitializedAC = () => ({type: 'app/SET_INITIALIZED'} as const)


//thanks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    const res = await authAPI.me()
    dispatch(setInitializedAC())
}


//types
type initialStateType = typeof initialState
type AuthReducerActionType =
    ReturnType<typeof setInitializedAC>