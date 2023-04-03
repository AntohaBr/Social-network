import axios  from 'axios'
import {ProfileType} from '../Redux/Profile-reducer'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post<FollowUnFollowResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unFollow(userId: number) {
        return instance.delete<FollowUnFollowResponseType>(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
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
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instance.post<LoginResponseType>(`auth/login`, {
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

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type ResponseItemsType = {
    id: number
    name: string
    uniqueUrlName: string
    photos: ResponsePhotosType
    status: string
    followed: boolean
}

export type ResponsePhotosType = {
    small: string
    large: string
}

export type LoginResponseType = {
    resultCode: ResultCodesEnum,
    messages: string [],
    data: {
        userId: number
    }
}

export type FollowUnFollowResponseType = {
    resultCode: ResultCodesEnum,
    messages: string [],
    data: {}
}