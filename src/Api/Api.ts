import axios from 'axios'
import {ProfileType} from 'Redux/Profile-reducer'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
    }
})


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

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(photos: any) {
        const formData = new FormData()
        formData.append('Image', photos)
        return instance.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    saveProfile(data: ProfileType) {
        return instance.put(`profile`, {data})
    }
}

export const authAPI = {
    getAuth() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ResponsePhotosType = {
    small: string
    large: string
}

type LoginResponseDataType = {
    userId: number
}

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

export type APIResponseType<D = {}> = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    fieldsErrors: []
    data: D
}

export type ItemsResponseType = {
    id: number
    name: string
    status: string
    uniqueUrlName: string
    photos: ResponsePhotosType
    followed: boolean
}

export type GetUsersResponseType<T = ItemsResponseType []> = {
    items: T
    totalCount: number
    error: string
}
