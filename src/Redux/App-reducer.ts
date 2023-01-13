import {Dispatch} from 'redux'
import {getAuth} from './Auth-reducer'


const initialState = {
    initialized: false,
}


//reducers
export const appReducer = (state: initialStateType = initialState, action: AuthReducerActionType): initialStateType => {
    switch (action.type) {
        case 'app/SET_INITIALIZED':
            return {...state, initialized: true}
        default:
            return state
    }
}


//thanks
export const initializeApp = () => async (dispatch: Dispatch<any>) => {
    await dispatch(getAuth())
    dispatch(setInitialized())
}


//actions
const setInitialized = () => ({type: 'app/SET_INITIALIZED'} as const)


//types
type initialStateType = typeof initialState
type AuthReducerActionType =
    ReturnType<typeof setInitialized>