import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick'
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router';
import './MedicalFacility.scss'


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService()
        if (res && res.data && res.data.errCode === 0) {
            this.setState({ arrClinic: res.data.data })
        }
    }

    handleRedirectLink = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }

    render() {
        let { arrClinic } = this.state
        return (
            <>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="home-page.outstanding-medical-facility" /></span>
                            <button className='btn-section'><FormattedMessage id="home-page.more-view" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props}>

                                {
                                    arrClinic && arrClinic.length > 0 &&
                                    arrClinic.map((item, index) => {
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleRedirectLink(item)}>
                                                <div className='bg-image section-medical-facility' style={{ backgroundImage: `url(${item.image})` }}></div>
                                                <h3>{item.name}</h3>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
