import React from 'react';
import {connect} from 'react-redux';
import {getStatusTC, getUserProfile, updateStatusTC} from '../../redux/ProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router';
import {AppStateType} from '../../redux/Redux-store';
import {Profile} from './Profile';
import {profileAPI, usersAPI} from "../../api/api";
import {compose} from "redux";


export type MapStateToPropsType = {
    profile: null | any,
    status: string
}

type  MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

type ParamsType ={
    userId:string
    status: string
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {

        let userId = Number(this.props.match.params.userId)
        if (!userId && this.props.profile){
            userId = this.props.profile.userId
        }
        usersAPI.getProfile(userId)
            .then((res) =>{
                this.props.getUserProfile(res.data.data.userId)
            })
        profileAPI.getStatus(userId)
            .then((res) =>{
                this.props.getStatus(res.data.data.status)
            })
    }

    render() {

        return (
            <div>
                <Profile{...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatusTC, updateStatusTC}),
    withRouter
) (ProfileContainer)
