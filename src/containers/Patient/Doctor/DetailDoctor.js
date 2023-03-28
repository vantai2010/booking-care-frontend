import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDetailDoctor } from '../../../store/actions/adminActions';
import { languages } from '../../../utils/constant';
import HomeHeader from '../../HomePage/HomeHeader'
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInFor from './DoctorExtraInFor';
import './DetailDoctor.scss'


class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            await this.props.getDetailDoctor(id)
            this.setState({ detailDoctor: this.props.inforDoctor })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.inforDoctor !== this.props.inforDoctor) {
            this.setState({ detailDoctor: this.props.inforDoctor })
        }
    }


    render() {
        let { detailDoctor } = this.state
        let nameVI = '', nameEN = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVI = detailDoctor.positionData.valueVi + ', ' + detailDoctor.lastName + ' ' + detailDoctor.firstName
            nameEN = detailDoctor.positionData.valueEn + ', ' + detailDoctor.firstName + ' ' + detailDoctor.lastName
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left" >
                            <img src={detailDoctor && detailDoctor.image ? detailDoctor.image : ''} />
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {this.props.language === languages.EN ? nameEN : nameVI}
                            </div>
                            <div className="down">
                                {
                                    detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.description &&
                                    <span>{detailDoctor.markdownData.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            {this.props.match && this.props.match.params && this.props.match.params.id &&
                                <DoctorSchedule
                                    id={this.props.match.params.id}
                                    firstNameDoctor={this.state.detailDoctor.firstName}
                                />
                            }

                        </div>
                        <div className="content-right">
                            <DoctorExtraInFor id={this.props.match.params.id} />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdownData.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor">hello </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.admin.isLoading,
        language: state.app.language,
        inforDoctor: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (id) => dispatch(fetchDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
