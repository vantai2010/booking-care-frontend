import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../utils/constant';
import localization from 'moment/locale/vi';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker'
import './ManagePatient.scss'
import { getAllPatientForDoctorService, sendRemedyService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            listPatient: [],
            isShowRemedyModal: false,
            dataModal: {}
        }
    }

    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let dateFormated = moment(currentDate).format('YYYY-MM-DD')
        await this.getDataPatient({ doctorId: user.id, date: dateFormated })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleOnchangeDatePicker = async (date) => {
        let dataTime = date[0]
        let dateFormated = moment(dataTime).format('YYYY-MM-DD')
        this.setState({
            currentDate: date[0]
        })
        if (this.props.user) {
            await this.getDataPatient({ doctorId: this.props.user.id, date: dateFormated })
        }

    }

    getDataPatient = async (input) => {
        let res = await getAllPatientForDoctorService({ doctorId: input.doctorId, date: input.date })
        if (res && res.data && res.data.errCode === 0) {
            this.setState({
                listPatient: res.data.data
            })
        }
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            dataModal: data,
            isShowRemedyModal: true
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isShowRemedyModal: false,
            dataModal: {}
        })
    }

    handleSendRemedy = async (image) => {
        let { dataModal, currentDate } = this.state
        let { language, user } = this.props
        let res = await sendRemedyService({
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            email: dataModal.email,
            image: image,
            language: this.props.language
        })
        if (res && res.data && res.data.errCode === 0) {
            toast.success(language === languages.EN ? res.data.messageEN : res.data.messageVI)
            let dateFormated = moment(currentDate).format('YYYY-MM-DD')
            await this.getDataPatient({ doctorId: user.id, date: dateFormated })
            this.setState({
                isShowRemedyModal: false,
                dataModal: {}
            })

        } else {
            toast.error(language === languages.EN ? res.data.messageEN : res.data.messageVI)
        }

    }

    render() {
        let { listPatient, isShowRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <RemedyModal
                    isOpen={isShowRemedyModal}
                    close={this.closeRemedyModal}
                    data={dataModal}
                    sendRemedy={this.handleSendRemedy}
                />
                <div className='manage-patient-container'>
                    <div className="title"><FormattedMessage id="manage-patient.title" /></div>

                    <div className="container">
                        <div className="manage-patient-body row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-patient.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className='list-patient col-12'>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col"><FormattedMessage id="manage-patient.time" /></th>
                                            <th scope="col"><FormattedMessage id="manage-patient.name" /></th>
                                            <th scope="col"><FormattedMessage id="manage-patient.phone-number" /></th>
                                            <th scope="col"><FormattedMessage id="manage-patient.address" /></th>
                                            <th scope="col"><FormattedMessage id="manage-patient.gender" /></th>
                                            <th scope="col"><FormattedMessage id="manage-patient.action" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listPatient && listPatient.length > 0 &&
                                            listPatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index}</th>
                                                        <td>{language === languages.EN ? item.timeData.valueEn : item.timeData.valueVi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.phoneNumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{language === languages.EN ? item.patientData.genderData.valueEn : item.patientData.genderData.valueVi}</td>
                                                        <td>
                                                            <button className='btn btn-success mx-2' onClick={() => this.handleConfirm(item)}><FormattedMessage id="manage-patient.confirm" /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        {
                                            listPatient && listPatient.length === 0 && <th><FormattedMessage id="modal.no-data" /></th>
                                        }
                                    </tbody>
                                </table>
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
        user: state.user.userInfor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
