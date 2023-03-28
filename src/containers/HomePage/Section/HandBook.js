import React, { Component } from 'react';
import Slider from 'react-slick'
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux';

class Handbook extends Component {
    
    render() {
        
        return (
            <>
                <div className='section-share section-handbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="home-page.hand-book" /></span>
                            <button className='btn-section'><FormattedMessage id="home-page.more-view" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props}>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 1</h3>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 2</h3>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 3</h3>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 4</h3>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 5</h3>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <h3>Bệnh viện hữu nghị 6</h3>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
