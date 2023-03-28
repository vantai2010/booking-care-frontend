import React, { Component } from 'react';
import { connect } from "react-redux";

import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../../utils/constant';
import { fetchListGenders } from '../../../../store/actions/adminActions';
import { toast } from 'react-toastify';
import { postBookAppointment } from '../../../../services/userService';
import { emitter } from '../../../../utils/emitter';
import { Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor.js';
import moment from 'moment';
import _ from 'lodash'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'M',
            reason: ''
        }
    }

    async componentDidMount() {
        await this.props.getListGender()
        this.setState({
            gender: this.props.listGenders[0].keyMap
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchangeInput = (event, key) => {
        this.setState({
            [key]: event.target.value
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let hours = language === languages.EN ? dataTime.timeTypeData.valueEn : dataTime.timeTypeData.valueVi
            let date = moment(dataTime.date).format('DD/MM/YYYY')
            return `${date}: ${hours}`
        }
        return ''
    }

    builDoctorName = (data) => {
        if (data && !_.isEmpty(data)) {
            let nameVI = data.doctorData.lastName + ' ' + data.doctorData.firstName
            let nameEN = data.doctorData.firstName + ' ' + data.doctorData.lastName

            if (this.props.language === languages.EN) {
                return nameEN
            } else {
                return nameVI
            }
        }
    }

    handleBookingConfirm = async () => {
        if (this.props.data && !_.isEmpty(this.props.data)) {
            let timeString = this.buildTimeBooking(this.props.data)
            let nameDoctor = this.builDoctorName(this.props.data)
            let res = await postBookAppointment({
                ...this.state,
                doctorId: this.props.data.doctorId,
                timeType: this.props.data.timeType,
                date: this.props.data.date,
                time: timeString,
                nameDoctor: nameDoctor,
                language: this.props.language
            })
            if (res && res.data && res.data.errCode === 0) {
                emitter.emit('CLOSE_MODAL_BOOKING', { isOpenModalBooking: false })
                toast.success(this.props.language === languages.EN ? res.data.messageEN : res.data.messageVI)
                this.setState({
                    email: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    gender: '',
                    reason: ''
                })
            } else {
                toast.error(this.props.language === languages.EN ? res.data.messageEN : res.data.messageVI)
            }

        }
    }

    render() {
        let { isOpen, close, data, language, listGenders } = this.props
        let { email, gender, firstName, lastName, address, phoneNumber, reason } = this.state
        let doctorId = ''
        if (data && !_.isEmpty(data)) {
            doctorId = data.doctorId
        }
        return (
            <>
                <Modal isOpen={isOpen} className={'booking-modal-container'} size='lg' backdrop={true}>
                    <div className='booking-modal-content'>

                        <div className='booking-modal-header'>
                            <span className='content-left'>Thông tin đặt lịch khám bệnh</span>
                            <span className='content-right'
                                onClick={() => close()}
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={data}
                                    isShowLocationDoctor={true}
                                    isShowLocationClinic={true}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.first-name" /></label>
                                    <input
                                        value={firstName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                        className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.last-name" /></label>
                                    <input
                                        value={lastName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                        className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.phone" /></label>
                                    <input
                                        value={phoneNumber}
                                        onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                        className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.email" /></label>
                                    <input
                                        value={email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                        className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.location" /></label>
                                    <input
                                        value={address}
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                        className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.for" /></label>
                                    <input
                                        value={firstName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                        className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.gender" /></label>
                                    <select className='form-control'
                                        value={gender}
                                        onChange={(e) => this.handleOnchangeInput(e, 'gender')}
                                    >
                                        {listGenders && listGenders.length > 0 && listGenders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index}>{language === languages.EN ? item.valueEn : item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.reason" /></label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                        className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-cancel' onClick={() => close()}><FormattedMessage id="patient.modal-booking.cancel" /></button>
                            <button className='btn-booking-confirm btn btn-primary'
                                onClick={() => this.handleBookingConfirm()}
                            >
                                <FormattedMessage id="patient.modal-booking.confirm" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listGenders: state.admin.listGenders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListGender: () => dispatch(fetchListGenders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
