import React, {useEffect} from 'react'
import {User} from 'Components/Users'
import {Paginator} from 'Common'
import {useAppDispatch, useAppSelector} from 'Utils'
import {
    selectIsAuth,
    selectUsers,
    selectUsersCurrentPage,
    selectUsersPageSize,
    selectUsersFilter
} from 'Store/Selectors'
import {getUsers} from 'Redux/Users-reducer/Users-reducer'
import {Navigate, useNavigate} from 'react-router-dom'
import {PATH} from 'Constants/Routing-constants'
import {UserSearchForm} from 'Components/Users/User-search-form/User-search-form'

export const Users = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const users = useAppSelector(selectUsers)
    const isAuth = useAppSelector(selectIsAuth)
    const currentPage = useAppSelector(selectUsersCurrentPage)
    const pageSize = useAppSelector(selectUsersPageSize)
    const filter = useAppSelector(selectUsersFilter)

    useEffect(() => {
        /*const parsed = queryString.parse(location.search.substr(1)) as {term: string, page: string, friend: string}

       let actualPage = currentPage
       let actualFilter = filter

       if(!!parsed.page) actualPage = Number(parsed.page)
       if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

       switch(parsed.friend) {
           case 'null':
               actualFilter = {...actualFilter, friend: null}
               break;
           case 'true':
               actualFilter = {...actualFilter, friend: true}
               break;
           case 'false':
               actualFilter = {...actualFilter, friend: false}
               break;
       }*/
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `&term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])


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



