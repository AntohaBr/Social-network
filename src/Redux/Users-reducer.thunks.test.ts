import {APIResponseType, GetUsersResponseType, ItemsResponseType, ResultCodeEnum, usersAPI} from '../Api/Api'
import {
    follow,
    followSuccess,
    requestUsers, setTotalUsersCount, setUsers,
    toggleFollowingProgress, toggleIsFetching,
    unFollow,
    unfollowSuccess
} from '../Redux/Users-reducer'


jest.mock('../Api/Api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unFollow.mockClear()
    userAPIMock.getUsers.mockClear()
})

const result1: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}

const result2: GetUsersResponseType = {
    items: [],
    totalCount: 1,
    error: ''
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result1))
userAPIMock.unFollow.mockReturnValue(Promise.resolve(result1))
userAPIMock.getUsers.mockReturnValue(Promise.resolve(result2))


test('success follow thunk',async () => {
    const thunk = follow(1,(userId:any) => ({resultCode: 0}))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})


test('success unFollow thunk',async () => {
    const thunk = unFollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})


test('success requestUsers thunk',async () => {
    const thunk = requestUsers(1,4)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleIsFetching(false))
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsers(false, 1))
    // expect(dispatchMock).toHaveBeenNthCalledWith(4, setTotalUsersCount(false, 1))
})