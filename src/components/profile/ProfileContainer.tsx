import React from 'react';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/ProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router';
import {AppStateType} from '../../redux/Redux-store';
import {Profile} from './Profile';
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hok/WithAuthredirect";


export type MapStateToPropsType = {
    profile: null | any,
}

type  MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}

type ParamsType ={
    userId:string
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        // let userId = this.props.match.params.userId
        // if (!userId){
        //     userId = 2
        // }
        let userId = Number(this.props.match.params.userId)
        if (!userId && this.props.profile){
            userId = this.props.profile.userId
        }
        usersAPI.getProfile(userId)
            .then((res) =>{
                this.props.getUserProfile(res.data.data.userId)
            })
    }

    render() {

        return (
            <div>
                <Profile{...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);