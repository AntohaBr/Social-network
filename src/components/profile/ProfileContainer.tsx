import React from 'react';
import {connect} from 'react-redux';
import {getUserProfile} from '../../redux/ProfileReducer';
import {RouteComponentProps, withRouter} from 'react-router';
import {AppStateType} from '../../redux/Redux-store';
import {Profile} from './Profile';
import {usersAPI} from "../../api/api";
import {Redirect} from "react-router-dom";


type MapStateToPropsType = {
    profile: null,
    isAuth: boolean
}

type  MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
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
        usersAPI.getProfile(userId)
            .then((res) =>{
                this.props.getUserProfile(res.data.data.userId)
            })
    }

    render() {

        if (!this.props.isAuth) return <Redirect to={'/Login'}/>

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
        isAuth: state.auth.isAuth
    }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);