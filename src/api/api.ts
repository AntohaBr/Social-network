import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<AxiosResponse<ResponseUserType>>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post<AxiosResponse<ResponseFollowType>>(`follow/${userId}`)
    },
    unFollow(userId: number) {
        return instance.delete<AxiosResponse<ResponseFollowType>>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return instance.get<AxiosResponse<ResponseProfileType>>('profile/' + userId)

    }
}

export const authAPI = {
    me() {
        return instance.get<AxiosResponse<ResponseAuthMeType>>(`auth/me`)
    }
}


type ResponseUserType = {
    items: ResponseItemsType[]
    totalCount: number
    error: string
}

export type ResponseItemsType = {
    id: number
    name: string
    uniqueUrlName: string
    photos: ResponsePhotosType
    status: string
    followed: boolean
}

type ResponseFollowType = {
    resultCode: number
    messages: string[]
    data: {}
}

export type ResponseAuthMeType = {
    data: AuthMeDataType
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type AuthMeDataType = {
    id: number
    login: string
    email: string
    isAuth?: boolean
}

export type ResponseProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ResponseContactsType
    photos: ResponsePhotosType
}

type ResponseContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type ResponsePhotosType = {
    small: string
    large: string
}
