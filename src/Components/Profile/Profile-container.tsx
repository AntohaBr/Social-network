import React from 'react'
import {connect} from 'react-redux'
import {
    getStatus,
    getProfile,
    savePhoto,
    updateStatus,
    saveProfile, PostType, addPost, ProfileType, PhotosType
} from '../../Redux/Profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppStateType} from '../../Redux/Redux-store'
import {Profile} from './Profile'
import {compose} from 'redux'
import {withAuthRedirect} from '../../HOK/With-auth-redirect'


export type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    authorisedUserId: number | null,
    isAuth: boolean
}

type  MapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileType) => void
}

type ParamsType = {
    userId: string
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<ProfileContainerType> {
    refreshProfile() {
        const {history, match} = this.props
        let userId: number | null = Number(match.params.userId)
        console.log(this.props.authorisedUserId)
        if (!userId) {
            userId = this.props.authorisedUserId
            if (!userId) {
                return history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}


const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    connect(MapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)
