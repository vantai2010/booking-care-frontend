import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux';

class About extends Component {
    
    render() {
        
        return (
            <>
                <div className='section-about'>
                    <div className='section-about-header'>
                        <FormattedMessage id="home-page.social-media" />
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="50%" height="400" 
                                src="https://www.youtube.com/embed/O4v1Mwyg-GM" 
                                title="Nelly Furtado - Say It Right (TikTok Remix/sped up) Lyrics | oh you don&#39;t mean nothing at all to me" 
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen
                                >
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p><FormattedMessage id="home-page.mission" /></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
