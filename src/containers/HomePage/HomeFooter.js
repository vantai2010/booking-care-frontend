import React, { Component } from 'react';
import Slider from 'react-slick'
import { connect } from 'react-redux';

class HomeFooter extends Component {
    
    render() {
        
        return (
            <>
                <div className='home-footer'>
                    <p>&copy; 2023 zephyous eagle <a target='_blank' href='#'>More information  &#8594; Click Here &#8592;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
