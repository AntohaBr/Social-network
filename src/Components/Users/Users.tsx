import React, {useEffect} from 'react'
import {User} from 'Components/Users'
import {Paginator} from 'Common'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectIsAuth, selectUsers, selectUsersCurrentPage, selectUsersPageSize, selectUsersFilter} from 'Store/Selectors'
import {getUsers} from 'Redux/Users-reducer/Users-reducer'
import {Navigate} from 'react-router-dom'
import {PATH} from 'Constants/Routing-constants'
import {UserSearchForm} from 'Components/Users/User-search-form/User-search-form'

export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)
    const isAuth = useAppSelector(selectIsAuth)
    const currentPage = useAppSelector(selectUsersCurrentPage)
    const pageSize = useAppSelector(selectUsersPageSize)
    const filter = useAppSelector(selectUsersFilter)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <UserSearchForm/>
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



