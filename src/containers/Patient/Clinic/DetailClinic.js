import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInFor from '../Doctor/DoctorExtraInFor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService } from '../../../services/userService';
import _ from 'lodash'

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailClinic: {},
            arrDoctorId: [],
        }
    }

    async componentDidMount() {
        let dataDoctorId = []
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let response = await getDetailClinicByIdService(id)

            if (response && response.data && response.data.errCode === 0) {
                if (response.data.data && response.data.data.doctor && response.data.data.doctor.length > 0) {
                    dataDoctorId = response.data.data.doctor.map(item => {
                        return item.doctorId
                    })
                }


                this.setState({
                    arrDoctorId: dataDoctorId,
                    dataDetailClinic: response.data.data.clinic
                })

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }





    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        let image = ''
        if (dataDetailClinic && !_.isEmpty(dataDetailClinic) && dataDetailClinic.image) {
            image = dataDetailClinic.image
        }
        return (
            <>
                <HomeHeader />
                <div className="detail-clinic-container">

                    <div className="description-clinic">
                        <div className="container">
                            {
                                dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div className='title'>{dataDetailClinic.name}</div>
                                    <div className=''>{dataDetailClinic.address}</div>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                </>
                            }
                        </div>

                    </div>

                    <div className="list-doctor">
                        <div className="container">


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
