import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {DataType, setAuthUserData} from "../../redux/Auth-Reducer";
import {authAPI} from "../../api/api";


export type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    isAuth: boolean
    login: null
}

type MapDispatchToPropsType ={
    setAuthUserData:(data: DataType)=>void
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
     authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header{...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);