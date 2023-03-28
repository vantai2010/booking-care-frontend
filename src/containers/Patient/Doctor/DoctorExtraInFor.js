import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import { getInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format'
import _ from 'lodash';
import './DoctorExtraInFor.scss'


class DoctorExtraInFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        let response = await getInforDoctorById(this.props.id)
        if (response && response.data && response.data.errCode === 0) {
            this.setState({
                extraInfor: response.data.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevState.language) {

        }
        if (this.props.id !== prevProps.id) {
            let response = await getInforDoctorById(this.props.id)

            if (response && response.data && response.data.errCode === 0) {
                this.setState({
                    extraInfor: response.data.data
                })
            }
        }
    }

    render() {
        let { extraInfor } = this.state
        let { language } = this.props
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className="detail-address">{extraInfor && extraInfor.addressClinic}</div>
                </div>
                <div className="content-down">
                    {this.state.isShowDetail === false ?
                        <div className='short-infor'>

                            <div><FormattedMessage id="patient.extra-infor-doctor.price" />
                                {extraInfor && extraInfor.priceData && language === languages.VI &&

                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceData.valueVi}
                                        displayType={'text'}
                                        thousandsSeparator={true}
                                        suffix={'VND'}
                                    />}
                                {extraInfor && extraInfor.priceData && language === languages.EN &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceData.valueEn}
                                        displayType={'text'}
                                        thousandsSeparator={true}
                                        suffix={'$'}
                                    />}

                            </div>
                            <span className="detail" onClick={() => this.setState({ isShowDetail: true })}><FormattedMessage id="patient.extra-infor-doctor.detail" /></span>
                        </div>
                        : <>
                            <div className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price" /></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className="left"><FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                    <span className="right">
                                        {!_.isEmpty(extraInfor) && !_.isEmpty(extraInfor.priceData) && language === languages.VI &&

                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'VND'}
                                            />}
                                        {extraInfor && extraInfor.priceData && language === languages.EN &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'$'}
                                            />}
                                    </span>
                                </div>
                                <div className='node'>{extraInfor && extraInfor.note}</div>
                            </div>
                            <div className='payment'><FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {!_.isEmpty(extraInfor) && !_.isEmpty(extraInfor.paymentData) && language === languages.VI && extraInfor.paymentData.valueVi}
                                {!_.isEmpty(extraInfor) && !_.isEmpty(extraInfor.paymentData) && language === languages.EN && extraInfor.paymentData.valueEn}
                            </div>

                            <div className="hide-price"><span onClick={() => this.setState({ isShowDetail: false })}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span></div>
                        </>}



                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInFor);
