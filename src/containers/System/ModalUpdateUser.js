import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import { getAllCodeService } from '../../services/userService'
import { languages } from '../../utils';
import { CommonUtils } from '../../utils';
import { fetchListGenders, fetchListRoles, fetchListPositions } from '../../store/actions/adminActions';

class ModalUpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            genderId: 'M',
            roleId: 'R1',
            positionId: 'P0',
            listRoles: [],
            listGenders: [],
            listPositions: [],
            password: '',
            previewImgUrl: '',
            image: ''

        }
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on('UPDATE_STATE_MODAL_UPDATE', data => {
            let image = new Buffer(data.image, 'base64').toString('binary')
            this.setState({
                ...this.state,
                ...data,
                image: image,
                previewImgUrl: image
            })
        })
    }
    async componentDidMount() {
        await this.props.getListGenders()
        await this.props.getListRoles()
        await this.props.getListPositions()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listGendersRedux !== this.props.listGendersRedux) {
            this.setState({
                listGenders: this.props.listGendersRedux
            })
        }
        if (prevProps.listRolesRedux !== this.props.listRolesRedux) {
            this.setState({
                listRoles: this.props.listRolesRedux
            })
        }
        if (prevProps.listPositionsRedux !== this.props.listPositionsRedux) {
            this.setState({
                listPositions: this.props.listPositionsRedux
            })
        }
    }

    handleShowHidePassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleOnchange = (type, even) => {
        this.setState({ [type]: even.target.value })
    }

    checkValideData = () => {
        let valid = true
        let arrInput = ['address', 'firstName', 'lastName', 'phoneNumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                valid = false
                toast.error(this.props.language === languages.EN ? 'missing information ' + arrInput[i] + ' !!!' : 'Vui lòng nhập ' + arrInput[i] + ' !!!')
                break;
            }
        }
        return valid
    }

    handleUpdateUser = async () => {
        let check = this.checkValideData()
        if (check) {
            this.props.updateUser(this.state)

        }
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                image: base64
            })

        }

    }

    render() {
        let { email, password, firstName, lastName, address, phoneNumber, genderId, roleId, positionId, listGenders, previewImgUrl, listPositions, listRoles } = this.state
        let { language } = this.props
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                className={this.props.className}
                size={'lg'}
            >
                <ModalHeader toggle={this.props.toggle}><FormattedMessage id="manage-user.update" /></ModalHeader>
                <ModalBody>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3"><FormattedMessage id="manage-user.update" />: --- {email} --- </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input value={firstName} onChange={(e) => this.handleOnchange('firstName', e)} className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input value={lastName} onChange={(e) => this.handleOnchange('lastName', e)} className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input value={phoneNumber} onChange={(e) => this.handleOnchange('phoneNumber', e)} className="form-control" type="text" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input value={address} onChange={(e) => this.handleOnchange('address', e)} className="form-control" type="text" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select value={genderId} onChange={(e) => this.handleOnchange('genderId', e)} className="form-control">
                                    {listGenders && listGenders.map((gender, index) => {
                                        return (
                                            <option value={gender.keyMap} key={index}>{language === languages.EN ? gender.valueEn : gender.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select value={roleId} onChange={(e) => this.handleOnchange('roleId', e)} className="form-control">
                                    {listRoles && listRoles.map((role, index) => {
                                        return (
                                            <option value={role.keyMap} key={index}>{language === languages.EN ? role.valueEn : role.valueVi}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select value={positionId} onChange={(e) => this.handleOnchange('positionId', e)} className="form-control">
                                    {listPositions && listPositions.map((position, index) => {
                                        return (
                                            <option value={position.keyMap} key={index}>{language === languages.EN ? position.valueEn : position.valueVi}</option>
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
                                    <div className="preview-image" style={{ backgroundImage: `url(${previewImgUrl})` }}>
                                        {/* <img className="preview-image" src={`${this.state.previewImgUrl}`}/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn-close' onClick={this.props.toggle}><FormattedMessage id="modal.close" /></Button>
                    <Button color="primary" className='btn-create' onClick={() => this.handleUpdateUser()}><FormattedMessage id="modal.create" /></Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listGendersRedux: state.admin.listGenders,
        listRolesRedux: state.admin.listRoles,
        listPositionsRedux: state.admin.listPositions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListGenders: () => dispatch(fetchListGenders()),
        getListPositions: () => dispatch(fetchListPositions()),
        getListRoles: () => dispatch(fetchListRoles()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);
