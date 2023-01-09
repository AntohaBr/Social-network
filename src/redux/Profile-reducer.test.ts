import {addPostAC, deletePostAC, initialStateType, profileReducer} from './Profile-reducer'
import {ResponseProfileType} from '../api/api'


let startState: initialStateType

beforeEach (() => {
    startState = {
        posts: [
            {id: 1, message: 'Hi, how a you?', likesCount: 12},
            {id: 2, message: 'It`s my first post', likesCount: 10},
            {id: 3, message: 'Yes', likesCount: 10},
            {id: 4, message: 'Dada', likesCount: 10}
        ],
        newPostsText: '',
        profile: {} as ResponseProfileType | null,
        status: '',
        postId: 1 as number
    }
})


test ('message of new post should be correct', () => {
 const action = addPostAC ('Hi friends')

    const newState = profileReducer (startState,action)

    expect(newState.posts[4].message).toBe('Hi friends')
})

test ('after deleting length of messages should be decrement',() =>{
    const action = deletePostAC(1)

    const newState = profileReducer (startState,action)

    expect(newState.posts.length).toBe(3)
})

test ('after deleting length shouldn`t  be decrement if id is incorrect',() =>{
    const action = deletePostAC(1000)

    const newState = profileReducer (startState,action)

    expect(newState.posts.length).toBe(4)
})