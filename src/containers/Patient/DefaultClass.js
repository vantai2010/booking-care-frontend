import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDetailDoctor } from '../../../store/actions/adminActions';
import { languages } from '../../../utils/constant';
import localization from 'moment/locale/vi';
import moment from 'moment';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        return (
            <>
                <div></div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (id) => dispatch(fetchDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
