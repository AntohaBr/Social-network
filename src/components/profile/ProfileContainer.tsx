import React from 'react';
import {connect} from 'react-redux';
import {getStatusTC, getUserProfile, updateStatusTC} from '../../redux/Profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router';
import {AppStateType} from '../../redux/Redux-store';
import {Profile} from './Profile';
import {ResponseProfileType} from "../../api/api";
import {compose} from "redux";


export type MapStateToPropsType = {
    profile: ResponseProfileType | null,
    status: string,
    authorisedUserId: string | null,
    isAuth: boolean
}

type  MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

type ParamsType = {
    userId: string
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorisedUserId as string
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return (
            <div>
                <Profile{...this.props} profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
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
    connect(MapStateToProps, {getUserProfile, getStatusTC, updateStatusTC}),
    withRouter
)(ProfileContainer)
