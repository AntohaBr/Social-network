import React from 'react';
import {RootStateType} from "../../redux/Store";
import {
    InitialStateType,
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from "../../redux/MessageReducer";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {dialogs} from "./Dialogs";


export type DialogsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    messagePage: InitialStateType
}

type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        messagePage: state.messagePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}


export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(dialogs)

