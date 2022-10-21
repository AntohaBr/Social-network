import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'ae4b4be5-c22f-4740-a061-685e83021457'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}& count = ${pageSize}`)
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
        return instance.get(`auth/me`)
    }
}