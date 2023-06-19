import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'f1636098-c65e-4218-94e5-e10509868ae3'
    }
})