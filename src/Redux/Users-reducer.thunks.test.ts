import {follow, getUsers, unFollow, userActions, UsersInitialStateType} from 'Redux/Users-reducer'
import {usersAPI} from 'Api'
import {GetUsersResponseType} from 'Api/User-api'
import {ResponseType} from 'Api/Auth-api'


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

const resultFollowUnFollow: ResponseType = {
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
        expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.toggleFollowingProgress(false, 1))
    })

    test('success unFollow thunk', async () => {
        usersAPI.unFollow = jest.fn().mockResolvedValueOnce(resultFollowUnFollow)

        const thunk = unFollow(2)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.toggleFollowingProgress(true, 2))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.unfollowSuccess(2))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.toggleFollowingProgress(false, 2))
    })

    test('success requestUsers thunk', async () => {
        usersAPI.getUsers = jest.fn().mockResolvedValueOnce(resultRequestUsers)

        const thunk = getUsers(1, 2)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(4)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.toggleIsFetching(true))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.toggleIsFetching(false))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.setUsers([]))
        expect(dispatchMock).toHaveBeenNthCalledWith(4, userActions.setTotalUsersCount(1))
    })
})
