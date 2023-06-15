import React, {useEffect, useState} from 'react'
import s from './Paginator.module.css'
import {useAppDispatch, useAppSelector} from 'Utils/Hooks'
import {
    selectUsersCurrentPage,
    selectUsersPageSize,
    selectUsersPortionSize,
    selectUsersTotalCount
} from 'Store/Selectors'
import {getUsers, setCurrentPage} from 'Redux/Users-reducer'


type PaginatorPropsType = {
    sectionSize: number
}

export const Paginator = (props: PaginatorPropsType) => {
    const dispatch = useAppDispatch()
    const pageSize = useAppSelector(selectUsersPageSize)
    const totalCount = useAppSelector(selectUsersTotalCount)
    const currentPage = useAppSelector(selectUsersCurrentPage)
    const portionSize = useAppSelector(selectUsersPortionSize)

    const pagesCount = Math.ceil(totalCount / pageSize)
    const pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)

    const [portionNumber, setPortionNumber] = useState(1)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / props.sectionSize))
    }, [currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(getUsers(pageNumber, pageSize))
    }

    const onClickPrevPortionNumberHandler = () => {
        setPortionNumber(portionNumber - 1)
    }

    const onClickNextPortionNumberHandler = () => {
        setPortionNumber(portionNumber + 1)
    }

    return (
        <div>
            {portionNumber > 1 &&
                <button onClick={onClickPrevPortionNumberHandler}>PREV</button>
            }
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <span className={currentPage === page ? s.selected : ''}
                                 onClick={() => onPageChanged(page)}>{page}</span>
                })}
            {portionCount > portionNumber &&
                <button onClick={onClickNextPortionNumberHandler}>NEXT</button>
            }
        </div>
    )
}