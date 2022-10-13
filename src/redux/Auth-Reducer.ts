const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    usersId: null,
    email: null,
    login: null
}

export type DataType = {
    usersId: null
    email: null
    login: null
}

type AuthReducerActionType =
    ReturnType<typeof setUserData>


export const authReducer = (state: DataType = initialState, action:AuthReducerActionType): DataType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;

    }
}


type SetUserType = {
    type: typeof SET_USER_DATA
    data: DataType
}

export const setUserData = (data:DataType): SetUserType => {
    return {
        type: SET_USER_DATA,
        data: data
    } as const
}

