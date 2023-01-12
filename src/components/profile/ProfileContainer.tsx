import React from 'react'
import {connect} from 'react-redux'
import {
    getStatus,
    getProfile,
    savePhoto,
    updateStatus,
    saveProfile, IMainUser, PostType, addPost
} from '../../redux/Profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppStateType} from '../../redux/Redux-store'
import {Profile} from './Profile'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hok/WithAuthRedirect'


export type MapStateToPropsType = {
    posts: PostType[]
    profile: IMainUser | null,
    status: string,
    authorisedUserId: string | null,
    isAuth: boolean
    error:string
}

type  MapDispatchToPropsType = {
    onChangePost: (newText: string) => void
    addPost: () => void
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
        error:state.usersPage.error
    }
}

export default compose<React.ComponentType>(
    connect(MapStateToProps, {addPost, getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter, withAuthRedirect
)(ProfileContainer)
