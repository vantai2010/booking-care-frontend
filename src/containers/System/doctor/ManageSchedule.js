import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl'
import './ManageSchedule.scss'
import { languages } from '../../../utils/constant';
import * as action from "../../../store/actions"
import Select from 'react-select'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment'
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveBulkScheduleDoctorService } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let obtions = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: obtions
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let obtions = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         optionDoctors: obtions
        //     })
        // }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (listDoctors) => {
        let arrObtion = []
        let { language } = this.props
        if (listDoctors && listDoctors.length > 0) {
            listDoctors.map((doctor, index) => {
                let object = {}
                let nameVI = `${doctor.lastName} ${doctor.firstName}`
                let nameEN = `${doctor.firstName} ${doctor.lastName}`
                object.value = doctor.id
                object.label = language === languages.VI ? nameVI : nameEN
                arrObtion.push(object)
            })
        }
        return arrObtion
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor })
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            let newRangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            this.setState({
                rangeTime: newRangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            return toast.error(this.props.language === languages.EN ? 'Missing select doctor !!!' : 'Bạn chưa chọn bác sĩ !!!')
        }
        if (!currentDate) {
            return toast.error(this.props.language === languages.EN ? 'Missing select time !!!' : 'Bạn chưa chọn thời gian !!!')
        }

        let selectedTime
        let result = []
        if (rangeTime && rangeTime.length > 0) {
            selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = moment(currentDate).format("YYYY-MM-DD")
                    object.timeType = item.keyMap
                    result.push(object)
                })
            } else {
                return toast.error(this.props.language === languages.EN ? 'Missing select time !!!' : 'Bạn chưa chọn thời gian !!!')
            }
        }

        let response = await saveBulkScheduleDoctorService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: moment(currentDate).format("YYYY-MM-DD")
        })
        if (response && response.data && response.data.errCode === 0) {
            toast.success(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
        } else {
            toast.error(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
        }

    }


    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="manage-schedule-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button key={index} className={item.isSelected === true ? 'btn btn-primary' : 'btn'}
                                                onClick={() => this.handleClickBtnTime(item)}
                                            >
                                                {language === languages.EN ? item.valueEn : item.valueVi}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
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
        allDoctors: state.admin.listDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
