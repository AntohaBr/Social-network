import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectErrorApp} from 'Store/Selectors'
import {appActions} from 'Redux/App-reducer'
import s from './Notification.module.scss'

export const Notification = () => {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector(selectErrorApp)

    const onClickHandlerCloseMessage = () => {
        dispatch(appActions.setAppError(null))
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         onClickHandlerCloseMessage()
    //     }, 5000);
    //     return () => clearInterval(timer);
    // })

    return (
        <div className={errorMessage ? s.notification_wrapper_error : s.notification_wrapper_success}>
            {errorMessage &&
                <p onClick={onClickHandlerCloseMessage}>{errorMessage}</p>
            }
            {/*{successMessage &&*/}
            {/*    <p onClick={onClickHandlerCloseMessage}>{successMessage}</p>*/}
            {/*}*/}
        </div>
    )
}

