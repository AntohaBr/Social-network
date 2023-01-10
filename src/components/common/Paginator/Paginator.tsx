import React, {useState} from 'react'
import s from './Paginator.module.css'


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize: number
}


export const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalCount / props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <span className={props.currentPage === page ? s.selected : ''}
                                 onClick={() => props.onPageChanged(page)}>{page}</span>
                })}
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    )
}