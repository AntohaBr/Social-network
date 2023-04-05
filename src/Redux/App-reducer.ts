import {Dispatch} from 'redux'
import {getAuth} from './Auth-reducer'
import {AppThunkType} from '../Redux/Redux-store'


const initialState = {
    initialized: false,
}


//reducers
export const appReducer = (state: initialStateType = initialState, action: AppReducerActionType): initialStateType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {...state, initialized: true}
        default:
            return state
    }
}


//thanks
export const initializeApp = ():AppThunkType => async (dispatch) => {
    await dispatch(getAuth())
    dispatch(setInitialized())
}


//actions
const setInitialized = () => ({type: 'app/SET_INITIALIZED'} as const)


//types
type initialStateType = typeof initialState
export type AppReducerActionType =
    ReturnType<typeof setInitialized>