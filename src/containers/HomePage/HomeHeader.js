import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomeHeader.scss';
import { connect } from 'react-redux';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router-dom';

class HomeHeader extends Component {

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    render() {

        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>
                                <img src={logo} onClick={() => this.returnToHome()} />
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.speciality' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeHeader.searchDoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.health-facility' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeHeader.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.doctor' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeHeader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeHeader.fee' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeHeader.check-health' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support' ><i className="fas fa-question-circle"></i>
                                <FormattedMessage id='homeHeader.support' />
                            </div>
                            <div className={this.props.language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.props.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={this.props.language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.props.changeLanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id='banner.title1' /></div>
                            <div className='title2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.specialized' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.remote' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.general' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.medicalTest' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.mentalHealth' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id='banner.dental' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
        changeLanguage: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
