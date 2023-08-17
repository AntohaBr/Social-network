import React, {useEffect} from 'react'
import {Navbar, Header, Notification} from 'Components'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectInitializeApp} from 'Store/Selectors'
import {initializeApp} from 'Redux/App-reducer'
import {PagesRoutes} from 'App/Routes/Routes'
import {Spin} from 'Assets/collections-antd'
import 'App/App.scss'

export const App = () => {
    const dispatch = useAppDispatch()
    const initializedApp = useAppSelector(selectInitializeApp)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initializedApp) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <Spin size='large'/>
            </div>
        )
    }

    return (
        <div className='app-wrapper'>
            <Header/>
            <Notification/>
            <PagesRoutes/>
            <Navbar/>
        </div>
    )
}
