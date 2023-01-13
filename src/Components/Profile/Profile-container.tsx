import React from 'react'
import {connect} from 'react-redux'
import {
    getStatus,
    getProfile,
    savePhoto,
    updateStatus,
    saveProfile, IMainUser, PostType, addPost
} from '../../Redux/Profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppStateType} from '../../Redux/Redux-store'
import {Profile} from './Profile'
import {compose} from 'redux'
import {withAuthRedirect} from '../../HOK/With-auth-redirect'


export type MapStateToPropsType = {
    posts: PostType[]
    profile: IMainUser | null,
    status: string,
    authorisedUserId: number | null,
    isAuth: boolean
    error: string
}

type  MapDispatchToPropsType = {
    onChangePost: (newText: string) => void
    addPost: () => void
    getProfile: (userId: number) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photos: any) => void
    saveProfile: (data: any) => void
}

type ParamsType = {
    userId: string
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<any, ProfileContainerType> {
    refreshProfile() {
        let userId: number | undefined = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                userId = this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.match.params.userID !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    addPost={this.props.addPost}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                    error={this.props.error}
                />
            </div>
        )
    }
}


const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
        error: state.usersPage.error
    }
}

export default compose<React.ComponentType>(
    connect(MapStateToProps, {addPost, getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,withAuthRedirect
)(ProfileContainer)
