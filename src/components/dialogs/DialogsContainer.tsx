import React from 'react';
import {
    InitialStateType, sendMessageAC,
    updateNewMessageBodyAC,
} from '../../redux/MessageReducer';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../redux/Redux-store';
import {WithAuthRedirect} from "../../hok/WithAuthRedirect";



export type DialogsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    messagePage: InitialStateType
}

type MapDispatchToPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagePage: state.messagePage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

