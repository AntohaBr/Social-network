import {APIResponseType, GetUsersResponseType, usersAPI} from 'Api/Api'
import {
    follow, followSuccess, getUsers, setTotalUsersCount, setUsers, toggleFollowingProgress, toggleIsFetching,
    unFollow, unfollowSuccess, UsersInitialStateType
} from 'Redux/Users-reducer'


jest.mock('../Api/Api')

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

// jest.mock('../Api/Api', () => {
//     return {
//         usersAPI: jest.mocked<typeof usersAPI>
//     }
// })

enum ResultCodeEnum {
    Success = 0,
}

const resultFollowUnFollow: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}

const resultRequestUsers: GetUsersResponseType = {
    items: [],
    totalCount: 1,
    error: ''
}

let state: UsersInitialStateType
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

describe('users reducer thunk tests', () => {
    beforeEach(() => {
        state = {
            users: [
                {
                    id: 1,
                    name: 'Stacy',
                    status: 'hello',
                    uniqueUrlName: '',
                    photos: {small: '', large: ''},
                    followed: false
                },
                {
                    id: 2,
                    name: 'Anton',
                    status: 'hello',
                    uniqueUrlName: '',
                    photos: {small: '', large: ''},
                    followed: true
                },
            ],
            pageSize: 10,
            totalCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [] as number[],
            portionSize: 10,
            error: ''
        }

        dispatchMock.mockClear()
        getStateMock.mockClear()
        usersAPIMock.follow.mockClear()
        usersAPIMock.unFollow.mockClear()
        usersAPIMock.getUsers.mockClear()
    })

    test('success follow thunk', async () => {
        usersAPI.follow = jest.fn().mockResolvedValueOnce(resultFollowUnFollow)

        const thunk = follow(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
    })

    test('success unFollow thunk', async () => {
        usersAPI.unFollow = jest.fn().mockResolvedValueOnce(resultFollowUnFollow)

        const thunk = unFollow(2)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 2))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess(2))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 2))
    })

    test('success requestUsers thunk', async () => {
        usersAPI.getUsers = jest.fn().mockResolvedValueOnce(resultRequestUsers)

        const thunk = getUsers(1, 2)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(4)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleIsFetching(false))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsers([]))
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setTotalUsersCount(1))
    })
})
