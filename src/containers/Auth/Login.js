import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginService } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }


    handleOnChangeInput = (type, e) => {
        this.setState({ [type]: e.target.value })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            const user = await handleLoginService(this.state.username, this.state.password)
            if (user.data.success === false) {
                this.setState({ errMessage: user.data.messageVI })
            } else {
                this.props.userLoginSuccess(user.data.user)
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleShowHidePassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='enter your username'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeInput('username', e)}

                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangeInput('password', e)}
                                    onKeyDown={e => this.handleKeyDown(e)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    {this.state.showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()} >login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 center mt-3'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
