import {instance} from 'Api/Instans'
import {ResponseType} from 'Api/Auth-api'
import {FilterType} from 'Redux/Users-reducer/Users-reducer'

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` +
            (friend === null ? '' : `&friend=${friend}`)).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
    }
}

//types
export type GetUsersResponseType<T = ItemsResponseType []> = {
    items: T
    totalCount: number
    error: string
}

export type ItemsResponseType = {
    id: number
    name: string
    status: string
    uniqueUrlName: string
    photos: ResponsePhotosType
    followed: boolean
}

export type ResponsePhotosType = {
    small: string
    large: string
}