import {instance} from 'Api/Instans'
import {ProfileType} from 'Redux/Profile-reducer/Profile-reducer'

export const profileAPI = {
    getProfile(profileId: number) {
        return instance.get<ProfileType>(`profile/${profileId}`).then(res => res.data)
    },
    getStatus(profileId: number) {
        return instance.get(`profile/status/${profileId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status}).then(response => response.data)
    },
    savePhoto(photos: any) {
        const formData = new FormData()
        formData.append('Image', photos)
        return instance.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => response.data)
    },
    saveProfile(data: ProfileType) {
        return instance.put(`profile`, {data}).then(response => response.data)
    }
}

