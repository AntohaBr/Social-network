import {profileAPI} from 'Api/Auth-api'
import {toggleFollowingProgress, UsersInitialStateType} from 'Redux/Users-reducer'
import {getProfile, ProfileType} from 'Redux/Profile-reducer'


jest.mock('../Api/Api')

const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>

const resultGetProfile: ProfileType = {
    aboutMe: '',
    userId: 4,
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: ''
    },
    photos: {
        small: '',
        large: ''
    }
}

let state: UsersInitialStateType
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('profile reducer thunk tests', () => {
    beforeEach(() => {
        // state = {
        //     users: [
        //         {
        //             id: 1,
        //             name: 'Stacy',
        //             status: 'hello',
        //             uniqueUrlName: '',
        //             photos: {small: '', large: ''},
        //             followed: false
        //         },
        //         {
        //             id: 2,
        //             name: 'Anton',
        //             status: 'hello',
        //             uniqueUrlName: '',
        //             photos: {small: '', large: ''},
        //             followed: true
        //         },
        //     ],
        //     pageSize: 10,
        //     totalCount: 0,
        //     currentPage: 1,
        //     isFetching: false,
        //     followingInProgress: [] as number[],
        //     portionSize: 10,
        //     error: ''
        // }

        dispatchMock.mockClear()
        getStateMock.mockClear()
        profileAPIMock.getProfile.mockClear()
    })

    test('success get profile thunk', async () => {
        profileAPIMock.getProfile = jest.fn().mockResolvedValueOnce(resultGetProfile)

        const thunk = getProfile(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleFollowingProgress(false, 1))
        // expect(dispatchMock).toHaveBeenNthCalledWith(3, setProfile({
        //     aboutMe: 'my life',
        //     userId: 1,
        //     lookingForAJob: false,
        //     lookingForAJobDescription: 'world',
        //     fullName: 'Anton',
        //     contacts: {},
        //     photos: {}
        // }))

    })
})
