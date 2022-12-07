import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/ProfileReducer";
import {RouteComponentProps, withRouter} from "react-router";
import {AppStateType} from "../../redux/Redux-store";


type MapStateToPropsType = {
    profile: null
}

type  MapDispatchToPropsType = {
    getUserProfile: (id: number) => void
}

type ParamsType ={
    userId:number
}

type OnProfileContainerType = MapStateToPropsType & MapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<ParamsType> & OnProfileContainerType


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = 2
        }
        this.props.getUserProfile(userId)
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
    profile: state.profilePage.profile
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(ProfileContainer);