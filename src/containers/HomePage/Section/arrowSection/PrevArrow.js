import React, { Component } from 'react';
import { connect } from 'react-redux';


class PrevArrow extends Component {

    render() {
        const { className, style, onClick } = this.props;
        return (
            <>
                <div
                  className={className}
                  style={{ ...style, display: "block", background: "red" }}
                  onClick={onClick}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(PrevArrow);
