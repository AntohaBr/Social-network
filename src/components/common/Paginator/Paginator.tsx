import React from 'react'


type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}


export const Paginator = (props: PaginatorPropsType) => {
    const pagesCount = Math.ceil(props.totalCount / props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>111</div>
    )
}