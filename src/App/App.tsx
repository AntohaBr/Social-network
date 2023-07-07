import React, {useEffect} from 'react'
import 'App/App.css'
import {useNavigate} from 'react-router-dom'
import {Navbar, Header, Notification} from 'Components'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectInitializeApp, selectStatusApp} from 'Store/Selectors'
import {initializeApp} from 'Redux/App-reducer'
import {PagesRoutes} from 'App/Routes/Routes'
import {Preloader} from 'Common'

export const App = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(selectInitializeApp)
    const status = useAppSelector(selectStatusApp)

    useEffect(() => {
        dispatch(initializeApp())

        if (!initialized) {
            navigate('/login')
        }

    }, [])

    return (
        <div className='app-wrapper'>
            <Header/>
            <Notification/>
            <div>
                {status === 'loading' && <Preloader/>}
                <PagesRoutes/>
            </div>
            <Navbar/>
        </div>
    )
}
