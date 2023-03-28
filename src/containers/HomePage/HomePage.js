import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About'
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: 'visible',
            currentSlide: 0,
        }

        this.handleBeforeChange = this.handleBeforeChange.bind(this)
    }

    handleBeforeChange(currentSlide, nextSlide, prevSlide) {
        if (nextSlide === 0) {
            this.setState({ visibility: "hidden" });
        }
        if (currentSlide === 0) {
            this.setState({ visibility: "hidden" });
        }
        this.setState({ visibility: "visible" });

    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            swipeToSlide: true,
            arrows: true,
            slidesToScroll: 2,
            // nextArrow: <NextArrow visibility={this.state.visibility}/>,
            // prevArrow: <PrevArrow visibility={this.state.visibility}/>,
            // beforeChange: this.handleBeforeChange
        }
        return (
            <>
                <HomeHeader isShowBanner={true} />
                <Specialty {...settings} />
                <MedicalFacility {...settings} />
                <OutStandingDoctor {...settings} />
                <HandBook {...settings} />
                <About />
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
