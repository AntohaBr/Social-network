import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
    },
    unFollow(id: number) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId: number) {
        return instance.get('profile/' + userId)

    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseAuthMeType>(`auth/me`)
    }
}



export type ResponseAuthMeType = {
    data:AuthMeDataType
    messages:[]
    fieldsErrors: []
    resultCode: number
}

export type AuthMeDataType = {
    id: number
    login: string
    email: string
    isAuth?:boolean
}

