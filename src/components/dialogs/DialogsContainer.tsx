import React from 'react';
import {
    InitialStateType, sendMessageAC,
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
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messagePage: state.messagePage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

