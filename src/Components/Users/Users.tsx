import React, {useEffect} from 'react'
import {User} from 'Components/Users'
import {Paginator, Preloader} from 'Common'
import {useAppDispatch, useAppSelector} from 'Utils'
import {selectUsers, selectUsersCurrentPage, selectUsersIsFetching, selectUsersPageSize} from 'Store/Selectors'
import {getUsers} from 'Redux/Users-reducer/Users-reducer'

export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)
    const isFetching = useAppSelector(selectUsersIsFetching)
    const currentPage = useAppSelector(selectUsersCurrentPage)
    const pageSize = useAppSelector(selectUsersPageSize)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    return (
        <div>
            {isFetching
                ? <Preloader/>
                : <div>
                    {users.map(user =>
                        <User key={user.id}
                              user={user}
                        />
                    )}
                </div>
            }
            <div>
                <Paginator sectionSize={10}/>
            </div>
        </div>
    )
}



