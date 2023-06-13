import React from 'react'
import {
    InitialStateType, sendMessageAC,
} from 'Redux/Message-reducer'
import {connect} from 'react-redux'
import {compose, Dispatch} from 'redux'
import {Dialogs} from './Dialogs'
import {AppStateType} from 'Store/Store'
import {withAuthRedirect} from 'HOK/With-auth-redirect'


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
    withAuthRedirect
)(Dialogs)

