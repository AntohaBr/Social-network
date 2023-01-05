import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./Profile-reducer";
import {usersReducer} from "./Users-reducer";
import {authReducer} from "./Auth-reducer";
import thunkMiddleware from "redux-thunk";
import {messageReducer} from "./Message-reducer";
import {reducer as formReducer} from "redux-form";
import {appReducer} from "./App-reducer";



const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
