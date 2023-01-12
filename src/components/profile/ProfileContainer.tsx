import React from 'react';
import {connect} from 'react-redux';
import {
    getStatus,
    getProfile,
    ResponseProfileType,
    savePhoto,
    updateStatus,
    saveProfile
} from '../../redux/Profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router';
import {AppStateType} from '../../redux/Redux-store';
import {Profile} from './Profile';
import {compose} from "redux";


export type MapStateToPropsType = {
    profile: ResponseProfileType | null,
    status: string,
    authorisedUserId: string | null,
    isAuth: boolean
}

type  MapDispatchToPropsType = {
    getProfile: (userId: string) => void
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


class ProfileContainer extends React.Component<ProfileContainerType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId as string
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <div>
                <Profile{...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                />
            </div>
        );
    }
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth

    }
}

export default compose<React.ComponentType>(
    connect(MapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)
