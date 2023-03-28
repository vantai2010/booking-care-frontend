import React, { Component } from 'react';
import { connect } from "react-redux";
import NumberFormat from 'react-number-format'
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash'
import moment from 'moment'
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfileDoctor: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfileDoctor: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.data && res.data.errCode === 0) {
                result = res.data.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId)

            this.setState({
                dataProfileDoctor: data
            })

        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let hours = language === languages.EN ? dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            let date = moment(dataTime.date).format('DD/MM/YYYY')
            return (
                <div><FormattedMessage id="patient.modal-booking.time" /> {date}: {hours}</div>
            )
        }
        return <></>

    }

    handleRedirectLinkDetail = () => {

    }

    render() {
        let { dataProfileDoctor } = this.state
        let { language, isShowDescriptionDoctor, dataTime, isShowLocationDoctor, isShowLocationClinic, isShowPrice, isShowLocation, isShowLinkDetail } = this.props
        let nameVI = '', nameEN = ''
        if (dataProfileDoctor && dataProfileDoctor.positionData) {
            nameVI = dataProfileDoctor.positionData.valueVi + ', ' + dataProfileDoctor.lastName + ' ' + dataProfileDoctor.firstName
            nameEN = dataProfileDoctor.positionData.valueEn + ', ' + dataProfileDoctor.firstName + ' ' + dataProfileDoctor.lastName
        }
        return (
            <>
                <div className='profile-doctor-container'>

                    <div className="intro-doctor">
                        <div className="profile-content-left" >
                            <img src={dataProfileDoctor && dataProfileDoctor.image ? dataProfileDoctor.image : ''} />
                        </div>
                        <div className="profile-content-right">
                            <div className="up">
                                {this.props.language === languages.EN ? nameEN : nameVI}
                            </div>
                            <div className="down">
                                {
                                    isShowDescriptionDoctor && dataProfileDoctor && dataProfileDoctor.markdownData && dataProfileDoctor.markdownData.description &&
                                    <span>{dataProfileDoctor.markdownData.description}</span>

                                }

                                {
                                    isShowLocationClinic && dataProfileDoctor && dataProfileDoctor.doctorInforData &&
                                    <div><FormattedMessage id="patient.modal-booking.check-at" /> {dataProfileDoctor.doctorInforData.nameClinic} -- {dataProfileDoctor.doctorInforData.addressClinic}</div>
                                }

                                {
                                    isShowLocationDoctor && this.renderTimeBooking(dataTime)
                                }

                                {
                                    isShowPrice &&
                                    <div className='price'>
                                        <span><FormattedMessage id="patient.extra-infor-doctor.price" />: </span>

                                        {dataProfileDoctor && dataProfileDoctor.doctorInforData && dataProfileDoctor.doctorInforData.priceData && language === languages.VI ?

                                            <NumberFormat
                                                className='currency'
                                                value={dataProfileDoctor.doctorInforData.priceData.valueVi}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'VND'}
                                            />
                                            : ''
                                        }
                                        {dataProfileDoctor && dataProfileDoctor.doctorInforData && dataProfileDoctor.doctorInforData.priceData && language === languages.EN ?

                                            <NumberFormat
                                                className='currency'
                                                value={dataProfileDoctor.doctorInforData.priceData.valueEn}
                                                displayType={'text'}
                                                thousandsSeparator={true}
                                                suffix={'$'}
                                            />
                                            : ''
                                        }
                                    </div>
                                }

                                {
                                    isShowLocation &&
                                    <div className="">

                                        location
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        isShowLinkDetail &&
                        <div className="see-more" onClick={() => this.handleRedirectLinkDetail()}>
                            <Link to={`/detail-doctor/${this.props.doctorId}`}><FormattedMessage id="patient.extra-infor-doctor.see-more" /></Link>
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
