import {instance} from 'Api/Instans'

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


//types
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
