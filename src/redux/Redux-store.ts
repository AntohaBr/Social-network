import {combineReducers, createStore} from "redux";
import messageReducer from "./MessageReducer";
import {profileReducer} from "./ProfileReducer";
import {usersReducer} from "./Users-Reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
