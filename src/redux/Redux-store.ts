import {combineReducers, createStore} from "redux";
import messageReducer from "./MessageReducer";
import {profileReducer} from "./ProfileReducer";
import {usersReducer} from "./Users-Reducer";
import {authReducer} from "./Auth-Reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    auth:authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
