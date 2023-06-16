import React, {useEffect} from 'react'
import './App.css'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {Navbar} from 'Components/Navbar/Navbar'
import {Header} from 'Components/Header/Header'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {selectInitializeApp} from 'Store/Selectors'
import {initializeApp} from 'Redux/App-reducer'
import {Profile} from 'Components/Profile/Profile'
import {Users} from 'Components/Users/Users'
import {Login} from 'Components/Login/Login'

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
                <Routes>
                    <Route path='/' element={<Navigate to={'/profile'}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/*<Route path='/dialogs' element={<DialogsContainer/>}/>*/}
                    <Route path='/profile/:userId?' element={<Profile/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='*' element={<div>404 NOT FOUND</div>}/>
                </Routes>
            </div>
        </div>
    )
}
