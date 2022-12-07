// import {
//     addPostActionCreator, profileReducer,
//     updateNewPostTextActionCreator
// } from "./ProfileReducer";
// import messageReducer, {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "./MessageReducer";
// import {UserType} from "./Users-Reducer";
//
//
// export type PostType = {
//     id: number,
//     message: string,
//     likesCount: number
// };
//
// export type DialogsType = {
//     id: number
//     name: string
// }
//
// export type MessagesType = {
//     id: number
//     message: string
// }
//
// export type ProfilePageType = {
//     posts: Array<PostType>
//     newPostsText: string
//     profile: null
// }
//
// export type MessagePageType = {
//     dialogs: Array<DialogsType>
//     messages: Array<MessagesType>
//     newMessageBody: string
// }
//
// export type UsersPageType = {
//     users:UserType[]
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress:[]
// }
//
// export type RootStateType = {
//     profilePage: ProfilePageType
//     messagePage: MessagePageType
//     usersPage: UsersPageType
//
// }
//
// export type StateTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>
//
// export type ActionTypes =
//     ReturnType<typeof updateNewMessageBodyActionCreator>
//     | ReturnType<typeof sendMessageActionCreator>
//     | ReturnType<typeof addPostActionCreator>
//     | ReturnType<typeof updateNewPostTextActionCreator>
//
// export type StoreType = {
//     _state: RootStateType
//     subscriber: (observer: (state: RootStateType) => void) => void
//     getState: () => RootStateType
//     dispatch: (action: ActionTypes | StateTypes) => void
//     _callSubscriber: (state: RootStateType) => void
// }

// export let store: StoreType = {
    // _state: {
    //     profilePage: {
    //         posts: [
    //             {id: 1, message: 'Hi, how a you?', likesCount: 12},
    //             {id: 2, message: 'It`s my first post', likesCount: 10}
    //         ],
    //         newPostsText: 'it-kamasutra.com',
    //     },
    //     messagePage: {
    //         dialogs: [
    //             {id: 1, name: 'Anton'},
    //             {id: 2, name: 'Igor'},
    //             {id: 3, name: 'Sasha'},
    //             {id: 4, name: 'Lena'},
    //             {id: 5, name: 'Masha'},
    //             {id: 6, name: 'Ira'}
    //         ],
    //         messages: [
    //             {id: 1, message: 'Hi'},
    //             {id: 2, message: 'Ha Ha'},
    //             {id: 3, message: 'Yo'},
    //             {id: 4, message: 'Yo'},
    //             {id: 5, message: 'Yo'},
    //             {id: 6, message: 'Yo'}
    //         ],
    //         newMessageBody: ''
    //     },
    //     usersPage: {
    //         users: [
    //             {
    //                 id: 1,
    //                 photos: '',
    //                 followed: false,
    //                 name: 'Anton',
    //                 status: 'I am a boss',
    //                 location: {city: 'Gomel', counter: 'Belarus'}
    //             },
    //             {
    //                 id: 2,
    //                 photos: '',
    //                 followed: true,
    //                 name: 'Max',
    //                 status: 'I am a boss too',
    //                 location: {city: 'LA', counter: 'USA'}
    //             },
    //             {
    //                 id: 3,
    //                 photos: '',
    //                 followed: false,
    //                 name: 'Alex',
    //                 status: 'I am a boss too ',
    //                 location: {city: 'Berlin', counter: 'Germany'}
    //             }
    //         ]
    //     }
    // },
    // getState() {
    //     return this._state
    // },
    // _callSubscriber() {
    //     console.log('ho ho')
    // },
    // subscriber(observer) {
    //     this._callSubscriber = observer;
    // },
    // dispatch(action) {
    //     this._state.profilePage = profileReducer(this._state.profilePage, action);
    //     this._state.messagePage = messageReducer(this._state.messagePage, action);
    //     this._callSubscriber(this._state);
    // }
// };





