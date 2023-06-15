import {addPost, deletePost, initialStateType, PostType, profileReducer, ProfileType} from './Profile-reducer'


let startState: initialStateType

beforeEach (() => {
    startState = {
        posts: [
            {id: 1, message: 'Hi, how a you?', likesCount: 12},
            {id: 2, message: 'It`s my first Post', likesCount: 10},
            {id: 3, message: 'Yes', likesCount: 10},
            {id: 4, message: 'Dada', likesCount: 10}
        ] as PostType[],
        newPostText: '',
        profile: {} as ProfileType,
        status: ''
    }
})


test ('Message of new Post should be correct', () => {
 const action = addPost ('Hi friends')

    const newState = profileReducer (startState,action)

    expect(newState.posts[4].message).toBe('Hi friends')
})

test ('after deleting length of messages should be decrement',() =>{
    const action = deletePost(1)

    const newState = profileReducer (startState,action)

    expect(newState.posts.length).toBe(3)
})

test ('after deleting length shouldn`t  be decrement if id is incorrect',() =>{
    const action = deletePost(1000)

    const newState = profileReducer (startState,action)

    expect(newState.posts.length).toBe(4)
})