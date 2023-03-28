import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import { FormattedMessage } from 'react-intl'
import { fetchTopDoctor } from '../../../store/actions/adminActions';
import { languages } from '../../../utils/constant';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listTopDoctors: []
        }
    }

    async componentDidMount() {

        await this.props.loadTopDoctors();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                listTopDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`)

        }
    }

    render() {

        let { language } = this.props
        let { listTopDoctors } = this.state
        if (listTopDoctors.length < 4) {
            listTopDoctors = listTopDoctors.concat(listTopDoctors).concat(listTopDoctors)
        }

        return (
            <>
                <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="home-page.out-standing-doctor" /></span>
                            <button className='btn-section'><FormattedMessage id="home-page.more-view" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props}>

                                {listTopDoctors && listTopDoctors.length > 0 &&
                                    listTopDoctors.map((doctor, index) => {
                                        let imageUrl = ''
                                        if (doctor.image) {
                                            imageUrl = new Buffer(doctor.image.data, 'base64').toString('binary')
                                        }

                                        let nameVI = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName} `;
                                        let nameEN = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(doctor)}>
                                                <div className='customize-border'>

                                                    <div className='outer-gb'>
                                                        <div className='bg-image section-outstanding-doctor' style={{ backgroundImage: `url(${imageUrl})` }} />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>
                                                            {language === languages.VI ? nameVI : nameEN}
                                                        </div>
                                                        <div>Cơ xương khớp 1</div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
