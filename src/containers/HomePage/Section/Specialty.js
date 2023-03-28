import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from 'react-slick'
import { getAllSpecialtyService } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listSpecialty: []
        }
    }

    async componentDidMount() {
        let response = await getAllSpecialtyService()
        if (response && response.data && response.data.errCode === 0) {
            this.setState({ listSpecialty: response.data.data })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)

        }
    }

    render() {
        let { listSpecialty } = this.state
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="home-page.popular-specialties" /></span>
                            <button className='btn-section'><FormattedMessage id="home-page.more-view" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props}>
                                {
                                    listSpecialty && listSpecialty.length > 0 &&
                                    listSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className='bg-image section-specialty' style={{ backgroundImage: `url(${item.image})` }}></div>
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
        // isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguage: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
