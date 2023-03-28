import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages } from "../../utils/constant"
import _ from 'lodash'
import { user_role } from '../../utils/constant';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let menu = []
        if (this.props.userInfo && !_.isEmpty(this.props.userInfo)) {
            let role = this.props.userInfo.roleId
            if (role === user_role.ADMIN) {
                menu = adminMenu
            }
            if (role === user_role.DOCTOR) {
                menu = doctorMenu
            }
        }

        this.setState({ menuApp: menu })
    }

    render() {
        const { processLogout, language } = this.props;
        return (
            <div className="header-container">

                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className="languages">
                    <span className={language === languages.VI ? "language-vi active" : "language-vi"} onClick={() => this.props.changeLanguageAppRedux(languages.VI)}>VI</span>
                    <span className={language === languages.EN ? "language-en active" : "language-en"} onClick={() => this.props.changeLanguageAppRedux(languages.EN)}>EN</span>

                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
