import {Dispatch} from 'redux'


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
export const initializeAppTC = () => (dispatch: Dispatch) => {
    // @ts-ignore
    // dispatch(getAuthUserDataTC())
    dispatch(setInitializedAC())

}


//types
type initialStateType = typeof initialState
type AuthReducerActionType =
    ReturnType<typeof setInitializedAC>