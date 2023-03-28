import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDetailDoctor } from '../../../store/actions/adminActions';
import { languages } from '../../../utils/constant';
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInFor from '../Doctor/DoctorExtraInFor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyByIdService } from '../../../services/userService';
import _ from 'lodash'
import { getAllCodeService } from '../../../services/userService';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailSpecialty: {},
            arrDoctorId: [],
            listProvince: []
        }
    }

    async componentDidMount() {
        let dataDoctorId = [], listProvince = []

        dataDoctorId = await this.handleSetListDoctor()
        let resProvince = await getAllCodeService('PROVINCE')
        if (resProvince && resProvince.data && resProvince.data.errCode === 0 && resProvince.data.data.length > 0) {
            listProvince.push({ keyMap: 'ALL', valueEn: 'nationwide', valueVi: 'Toàn quốc' })
            resProvince.data.data.map(item => {
                listProvince.push({
                    keyMap: item.keyMap,
                    valueEn: item.valueEn,
                    valueVi: item.valueVi
                })
            })

        }
        this.setState({
            arrDoctorId: dataDoctorId,
            listProvince
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSetListDoctor = async (location = 'ALL') => {
        let dataDoctorId = []
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let response = await getDetailSpecialtyByIdService(id, location)

            if (response && response.data && response.data.errCode === 0) {
                if (response.data.data && response.data.data.doctor && response.data.data.doctor.length > 0) {
                    dataDoctorId = response.data.data.doctor.map(item => {
                        return item.doctorId
                    })
                }


                this.setState({
                    arrDoctorId: dataDoctorId,
                    dataDetailSpecialty: response.data.data.specialty
                })

            }
        }
        return dataDoctorId
    }

    handleOnchangeLocation = async (event) => {
        await this.handleSetListDoctor(event.target.value)
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props
        let image = ''
        if (dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && dataDetailSpecialty.image) {
            image = dataDetailSpecialty.image
        }
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">

                    <div className="description-specialty" style={{ background: `url(${image})` }}>
                        <div className="container">
                            {
                                dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                        </div>

                    </div>

                    <div className="list-doctor">
                        <div className="container">
                            {

                                <select className='form-control col-2 mb-3' onChange={(e) => this.handleOnchangeLocation(e)}>
                                    {
                                        listProvince && listProvince.length > 0 &&
                                        listProvince.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === languages.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            }

                            {
                                arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return (
                                        <div className="each-doctor" key={index}>
                                            <div className="content-left">
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    // dataTime={data}
                                                    isShowLocationDoctor={true}
                                                    isShowLocationClinic={true}
                                                    isShowLocation={true}
                                                    isShowLinkDetail={true}
                                                />
                                            </div>

                                            <div className="content-right">
                                                <div>
                                                    <DoctorSchedule
                                                        id={item}
                                                    />
                                                </div>
                                                <div>
                                                    <DoctorExtraInFor id={item} />
                                                </div>

                                            </div>
                                        </div>

                                    )
                                })
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
