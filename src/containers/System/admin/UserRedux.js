import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { languages } from '../../../utils/constant';
import './UserRedux.scss'
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listRoles: [],
            listGenders: [],
            listPositions: [],
            previewImgUrl: ''
        }
    }

    async componentDidMount() {
        try {
            const role = await getAllCodeService('ROLE')
            const gender = await getAllCodeService('GENDER')
            const position = await getAllCodeService('POSITION')
            this.setState({
                listRoles: role.data.data,
                listGenders: gender.data.data,
                listPositions: position.data.data
            })
        } catch (error) {
            console.log(error)
        }

    }

    handleOnchangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
        }
    }

    render() {
        const { listRoles, listGenders, listPositions } = this.state
        const { language } = this.props
        return (
            <div className="user-redux-container">
                <div className="title">
                    manage user redux
                </div>
                <div className="user-redux-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {listGenders && listGenders.map((gender, index) => {
                                        return (
                                            <option value={gender.key} key={index}>{language === languages.EN ? gender.valueEn : gender.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    {listRoles && listRoles.map((role, index) => {
                                        return (
                                            <option value={role.key} key={index}>{language === languages.EN ? role.valueEn : role.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    {listPositions && listPositions.map((position, index) => {
                                        return (
                                            <option value={position.key} key={index}>{language === languages.EN ? position.valueEn : position.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="choise-image" className="form-control" type="file" hidden
                                        onChange={(e) => this.handleOnchangeImage(e)}
                                    />
                                    <label htmlFor="choise-image" className="btn-choise-image"><FormattedMessage id="manage-user.choise" /><i className="fas fa-upload"></i></label>
                                    <div>
                                        <img className="preview-image" src={`${this.state.previewImgUrl}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
