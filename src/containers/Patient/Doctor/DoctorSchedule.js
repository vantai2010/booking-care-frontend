import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDetailDoctor } from '../../../store/actions/adminActions';
import { languages } from '../../../utils/constant';
import localization from 'moment/locale/vi';
import moment from 'moment';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { emitter } from '../../../utils/emitter';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    setArrDays = () => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (this.props.language === languages.EN) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${DDMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')

                }

            } else {
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${DDMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object)
        }
        return arrDays
    }

    async componentDidMount() {
        let arrDays = this.setArrDays()
        if (arrDays && arrDays.length > 0) {
            let data = {
                doctorId: this.props.id,
                date: arrDays[0].value
            }
            let response = await getScheduleDoctorByDateService(data)
            if (response && response.data && response.data.errCode === 0) {
                this.setState({
                    allAvailableTime: response.data.data
                })
                this.setState({
                    arrDays: arrDays
                })
            }
        }
        emitter.on('CLOSE_MODAL_BOOKING', (data) => {
            this.setState(data)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let arrDays = this.setArrDays()
            this.setState({
                arrDays: arrDays
            })
        }
    }

    handleOnchangeSelect = async (event) => {

        let doctorId = this.props.id
        let date = event.target.value

        let response = await getScheduleDoctorByDateService({ doctorId, date })
        if (response && response.data && response.data.errCode === 0) {
            this.setState({
                allAvailableTime: response.data.data
            })
        }


    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    handleCloseBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { arrDays, allAvailableTime } = this.state
        let { language } = this.props


        return (
            <>
                <BookingModal
                    isOpen={this.state.isOpenModalBooking}
                    close={this.handleCloseBookingModal}
                    data={this.state.dataScheduleTimeModal}
                />
                <div className='doctor-schedule-container'>
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            {arrDays && arrDays.length > 0 &&
                                arrDays.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="all-available-time" >
                        <div className="text-calendar">
                            <span><i className='fas fa-calendar-alt' /><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 &&
                                <>
                                    <div className="time-content-btn">
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === languages.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi
                                            return (
                                                <button
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                    key={index}
                                                    className={language === languages.EN ? 'btn-en' : 'btn-vi'}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="book-free">
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /><i className="far fa-hand-point-up"></i><FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                || <div className="no-schedule"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }
                        </div>

                    </div>
                </div>
            </>
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
        getDetailDoctor: (id) => dispatch(fetchDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
