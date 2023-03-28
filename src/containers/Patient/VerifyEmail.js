import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../utils';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookAppointment } from '../../services/userService';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageEN: '',
            messageVI: ''
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let response = await postVerifyBookAppointment({ token, doctorId })
            if (response && response.data && response.data.errCode === 0) {
                this.setState({
                    messageEN: response.data.messageEN,
                    messageVI: response.data.messageVI
                })

            } else {
                this.setState({
                    messageEN: response.data.messageEN,
                    messageVI: response.data.messageVI
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <p className="title" style={{ paddingTop: '100px' }}>{this.props.language === languages.EN ? this.state.messageEN : this.state.messageVI}</p>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
