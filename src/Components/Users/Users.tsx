import React, {useEffect} from 'react'
import {User} from 'Components/Users'
import {Paginator} from 'Common'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectIsAuth, selectUsers, selectUsersCurrentPage, selectUsersPageSize} from 'Store/Selectors'
import {getUsers} from 'Redux/Users-reducer/Users-reducer'
import {Navigate} from 'react-router-dom'
import {PATH} from 'Constants/Routing-constants'

export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)
    const isAuth = useAppSelector(selectIsAuth)
    const currentPage = useAppSelector(selectUsersCurrentPage)
    const pageSize = useAppSelector(selectUsersPageSize)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <div>
                {users.map(user =>
                    <User key={user.id}
                          user={user}
                    />
                )}
            </div>
            <div>
                <Paginator sectionSize={10}/>
            </div>
        </div>
    )
}



