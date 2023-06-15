import {instance} from 'Api/Instans'
import {APIResponseType, ItemsResponseType} from 'Api/Auth-api'

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}

//types
export type GetUsersResponseType<T = ItemsResponseType []> = {
    items: T
    totalCount: number
    error: string
}
