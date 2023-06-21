import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from 'Components/Login'
import {Profile} from 'Components/Profile'
import {Users} from 'Components/Users'
import React from 'react'
import {PATH} from 'Constants/Routing-constants'
import {Dialogs} from 'Components/Dialogs'

export const PagesRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.HOME} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.DIALOGS} element={<Dialogs/>}/>
            <Route path={`${PATH.PROFILE}/:userId`} element={<Profile/>}/>
            <Route path={PATH.USERS} element={<Users/>}/>
            <Route path='*' element={<div>404 NOT FOUND</div>}/>
        </Routes>
    )
}