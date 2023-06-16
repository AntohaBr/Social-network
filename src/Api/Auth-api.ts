import {instance} from 'Api/Instans'

export const authAPI = {
    getAuth() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, data).then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`).then(res => res.data)
    }
}


//types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: null | string
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type LoginResponseDataType = {
    userId: number
}

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

export type ResponseType<D = {}> = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    fieldsErrors: []
    data: D
}
