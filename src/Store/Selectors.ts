import {AppStateType} from 'Store/Store'

//selectorsUsers
export const selectUsers = (state: AppStateType) => state.usersPage.users
export const selectUsersPageSize = (state: AppStateType) => state.usersPage.pageSize
export const selectUsersTotalCount = (state: AppStateType) => state.usersPage.totalCount
export const selectUsersCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const selectUsersIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const selectUsersFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const selectUsersPortionSize = (state: AppStateType) => state.usersPage.portionSize
export const selectUsersFilter = (state: AppStateType) => state.usersPage.filter

//selectorsProfile
export const selectProfile = (state: AppStateType) => state.profilePage.profile
export const selectProfilePhotosSmall = (state: AppStateType) => state.profilePage.profile?.photos?.small
export const selectProfileStatus = (state: AppStateType) => state.profilePage.status
export const selectProfilePosts = (state: AppStateType) => state.profilePage.posts

//selectorsAuth
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectLogin = (state: AppStateType) => state.auth.login
export const selectAuthId = (state: AppStateType) => state.auth.id
export const selectCaptcha = (state: AppStateType) => state.auth.captchaUrl

//selectorsApp
export const selectInitializeApp = (state: AppStateType) => state.app.initialized
export const selectStatusApp = (state: AppStateType) => state.app.status
export const selectErrorApp = (state: AppStateType) => state.app.error
export const selectSuccessMessageApp = (state: AppStateType) => state.app.successMessage

//selectorsMessage
export const selectMessages = (state: AppStateType) => state.messagePage.messages
export const selectDialogs = (state: AppStateType) => state.messagePage.dialogs

//selectorsChat
export const selectChatMessages = (state: AppStateType) => state.chat.messages
export const selectStatus = (state: AppStateType) => state.chat.status