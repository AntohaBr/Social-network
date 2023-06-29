import {instance} from 'Api/Instans'

export const securityAPI = {
    getCaptchaURL() {
        return instance.get<GetCaptchaURLResponseType>(`security/get-captcha-url`).then(response => response.data)
    }
}

//types
export type GetCaptchaURLResponseType = {
    url: string
}