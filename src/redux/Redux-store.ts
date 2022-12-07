import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./ProfileReducer";
import {usersReducer} from "./Users-Reducer";
import {authReducer} from "./Auth-Reducer";
import thunkMiddleware from "redux-thunk";
import {messageReducer} from "./MessageReducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    auth:authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
