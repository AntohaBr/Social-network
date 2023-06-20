import React, {useEffect} from 'react'
import 'App/App.css'
import {useNavigate} from 'react-router-dom'
import {Navbar} from 'Components/Navbar/Navbar'
import {Header} from 'Components/Header/Header'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectInitializeApp} from 'Store/Selectors'
import {initializeApp} from 'Redux/App-reducer'
import {PagesRoutes} from 'App/Routes/Routes'

export const App = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(selectInitializeApp)

    useEffect(() => {
        dispatch(initializeApp())

        if (!initialized) {
            navigate('/login')
        }

    }, [])

    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <PagesRoutes/>
            </div>
        </div>
    )
}
