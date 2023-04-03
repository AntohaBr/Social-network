import {FollowUnFollowResponseType, ResultCodesEnum, usersAPI} from '../Api/Api'
import {follow, toggleFollowingProgress} from '../Redux/Users-reducer'


jest.mock('../Api/Api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unFollow.mockClear()
})

const result: FollowUnFollowResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))
// userAPIMock.unFollow.mockReturnValue(Promise.resolve(result))

test('',async () => {
    const thunk = follow(1)

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})