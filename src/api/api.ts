import axios from 'axios';


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
        return instance.post(`follow/${userId}`)
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: string) {
        console.log('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)

    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get('profile/' + userId)
    },
    getStatus(userId: string) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}

type GetStatusResponseType = {
        status: string
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
    location: LocationType
}

type LocationType = {
    city: string
    country: string
}

type ResponseFollowType = {
    resultCode: number
    messages: string[]
    data: {}
}
type UpdateStatusResponseType = ResponseFollowType

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
    userId?: number | null
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts: ResponseContactsType
    photos?: ResponsePhotosType
    aboutMe?: string
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
