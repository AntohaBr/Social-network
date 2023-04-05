import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer, ProfileReducerActionTypes} from './Profile-reducer'
import {usersReducer, UsersReducerActionType} from './Users-reducer'
import {authReducer, AuthReducerActionType} from './Auth-reducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {messageReducer, MessageReducerActionType} from './Message-reducer'
import {reducer as formReducer} from 'redux-form'
import {appReducer, AppReducerActionType} from './App-reducer'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type AppActionsType = ProfileReducerActionTypes |
    MessageReducerActionType |
    UsersReducerActionType |
    AuthReducerActionType |
    AppReducerActionType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>
export type InferActionsTypes<T> = T extends { [key: string]: (...args:any[] )=> infer U} ? U : never

// @ts-ignore
window.store = store