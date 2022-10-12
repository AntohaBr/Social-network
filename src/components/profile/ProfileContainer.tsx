import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/Store";
import {setUserProfile} from "../../redux/ProfileReducer";
import {withRouter} from "react-router";


export type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    profile: null
}

type  MapDispatchToPropsType = {
    setUserProfile: (profile: null) => void
}

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = 2
        }
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
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

const mapStateToProps = (state: RootStateType) => {
    profile: state.profilePage.profile
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);