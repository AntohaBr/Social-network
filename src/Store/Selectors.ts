import {AppStateType} from 'Store/Store'

//selectorsUsers
export const selectUsers = (state: AppStateType) => state.usersPage.users
export const selectUsersPageSize = (state: AppStateType) => state.usersPage.pageSize
export const selectUsersTotalCount = (state: AppStateType) => state.usersPage.totalCount
export const selectUsersCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const selectUsersIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const selectUsersFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
export const selectUsersPortionSize = (state: AppStateType) => state.usersPage.portionSize

//selectorsProfile
export const selectProfile = (state: AppStateType) => state.profilePage.profile
export const selectProfilePhotosSmall = (state: AppStateType) => state.profilePage.profile?.photos?.small
export const selectProfileStatus = (state: AppStateType) => state.profilePage.status
export const selectProfilePosts = (state: AppStateType) => state.profilePage.posts

//selectorsAuth
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth
export const selectLogin = (state: AppStateType) => state.auth.login
export const selectAuthId = (state: AppStateType) => state.auth.id
export const selectCaptchaURL = (state: AppStateType) => state.auth.captchaURL

//selectorsApp
export const selectInitializeApp = (state: AppStateType) => state.app.initialized
export const selectStatusApp = (state: AppStateType) => state.app.status

//selectorsMessage
export const selectMessages = (state: AppStateType) => state.messagePage.messages
export const selectDialogs = (state: AppStateType) => state.messagePage.dialogs