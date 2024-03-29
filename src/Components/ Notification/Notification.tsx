import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectErrorApp, selectSuccessMessageApp} from 'Store/Selectors'
import {appActions} from 'Redux/App-reducer'
import s from './Notification.module.scss'
import Error from 'Assets/Images/Error.png'
import Success from 'Assets/Images/Success.png'

export const Notification = () => {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector(selectErrorApp)
    const successMessage = useAppSelector(selectSuccessMessageApp)

    const onClickHandlerCloseMessage = () => {
        dispatch(appActions.setAppError(null))
        dispatch(appActions.setAppSuccessMessage(null))
    }

    useEffect(() => {
        const timer = setInterval(() => {
            onClickHandlerCloseMessage()
        }, 5000);
        return () => clearInterval(timer);
    })

    return (
        <div className={s.notification_wrapper_notification}>
            {errorMessage &&
                <div className={s.notification_wrapper_error_block}>
                    <img alt='error' src={Error}/>
                    <span onClick={onClickHandlerCloseMessage}
                          className={s.notification_wrapper_error_text}>{errorMessage}</span>
                </div>

            }
            {successMessage &&
                <div className={s.notification_wrapper_success_block}>
                    <img alt='success' src={Success}/>
                    <span onClick={onClickHandlerCloseMessage}
                          className={s.notification_wrapper_success_text}>{successMessage}</span>
                </div>
            }
        </div>
    )
}

