import {Navigate, Route, Routes} from 'react-router-dom'
import {Login, Profile, Users, Chat} from 'Components'
import React from 'react'
import {PATH} from 'Constants/Routing-constants'

export const PagesRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.HOME} element={<Navigate to={PATH.PROFILE}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={`${PATH.PROFILE}/:userId`} element={<Profile/>}/>
            <Route path={PATH.USERS} element={<Users/>}/>
            <Route path={PATH.CHAT} element={<Chat/>}/>
            <Route path='*' element={<div>404 NOT FOUND</div>}/>
        </Routes>
    )
}