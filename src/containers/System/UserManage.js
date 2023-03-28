import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { createNewUserService, getAllUsersService, deleteUserService, updateUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { languages } from '../../utils';
import { emitter } from '../../utils/emitter';
import ModalUpdateUser from './ModalUpdateUser';
import { toast } from "react-toastify";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRole: 'R1',
            arrUsers: {
                R1: [],
                R2: [],
                R3: []
            },
            isOpenModalUser: false,
            isOpenModalUpdateUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersToState()
    }

    getAllUsersToState = async () => {
        let response = await getAllUsersService('All')
        if (response && response.data.errCode === 0) {
            let coppyArrUser = { ...this.state.arrUsers }
            coppyArrUser.R1 = response.data.users.filter(user => user.roleId === 'R1')
            coppyArrUser.R2 = response.data.users.filter(user => user.roleId === 'R2')
            coppyArrUser.R3 = response.data.users.filter(user => user.roleId === 'R3')
            this.setState({ arrUsers: { ...coppyArrUser } })
        }
    }

    toggleModalUser = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser })
        emitter.emit('RESET_STATE_DATA_MODAL_USER')
    }

    toggleModalUpdateUser = () => {
        this.setState({ isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser })

    }

    createNewUser = async (data) => {
        try {
            const response = await createNewUserService(data)
            if (response.data.errCode === 0) {
                toast.success(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
                this.setState({ isOpenModalUser: false })
                this.getAllUsersToState()

                emitter.emit('RESET_STATE_DATA_MODAL_USER')
            } else {
                toast.error(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
            }

        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (data) => {
        try {
            const response = await updateUserService(data)
            if (response.data.errCode === 0) {
                this.setState({ isOpenModalUpdateUser: false })
                this.getAllUsersToState()
                toast.success(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
            } else {
                toast.error(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleCreateNewUser = () => {
        this.setState({ isOpenModalUser: true })
    }

    handleDelete = async (id) => {
        try {
            const response = await deleteUserService(id)
            if (response && response.data.errCode === 0) {
                toast.success(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
                this.getAllUsersToState()
            } else {
                toast.error(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleUpdateUser = (user) => {
        this.setState({
            isOpenModalUpdateUser: true,
        })
        emitter.emit('UPDATE_STATE_MODAL_UPDATE', user)
    }



    render() {
        let arrUsers = this.state.arrUsers
        return (
            <>
                <div className="users-container">
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggle={this.toggleModalUser}
                        className={'modal-user-container'}
                        createNewUser={this.createNewUser}
                    />
                    <ModalUpdateUser
                        isOpen={this.state.isOpenModalUpdateUser}
                        toggle={this.toggleModalUpdateUser}
                        className={'modal-user-container'}
                        updateUser={this.updateUser}
                    />
                    <div className="title text-center"><FormattedMessage id="manage-user.title" /></div>
                    <div className="users-table mt-4 mx-3">
                        <div className="btn-container">
                            <button className="btn-create" onClick={() => this.handleCreateNewUser()}><FormattedMessage id="manage-user.btn-create" /></button>
                            <div className="nav-btn">
                                <button
                                    className={this.state.currentRole === 'R1' ? 'select' : ''}
                                    onClick={() => this.setState({ currentRole: 'R1' })}
                                >
                                    <FormattedMessage id="manage-user.btn-admin" /> ({this.state.arrUsers.R1.length})
                                </button>
                                <button
                                    className={this.state.currentRole === 'R2' ? 'select' : ''}
                                    onClick={() => this.setState({ currentRole: 'R2' })}
                                >
                                    <FormattedMessage id="manage-user.btn-doctor" /> ({this.state.arrUsers.R2.length})
                                </button>
                                <button
                                    className={this.state.currentRole === 'R3' ? 'select' : ''}
                                    onClick={() => this.setState({ currentRole: 'R3' })}
                                >
                                    <FormattedMessage id="manage-user.btn-patient" /> ({this.state.arrUsers.R3.length})
                                </button>
                            </div>
                        </div>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="table.email" /></th>
                                    <th><FormattedMessage id="table.first-name" /></th>
                                    <th><FormattedMessage id="table.last-name" /></th>
                                    <th><FormattedMessage id="table.address" /></th>
                                    <th><FormattedMessage id="table.phone-number" /></th>
                                    <th><FormattedMessage id="table.gender" /></th>
                                    <th><FormattedMessage id="table.action" /></th>

                                </tr>

                                {
                                    arrUsers && arrUsers[this.state.currentRole].length > 0 &&
                                    arrUsers[this.state.currentRole].map((user, index) => {
                                        console.log(user)
                                        return (
                                            <tr key={index}>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.address}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{user.genderData && this.props.language === languages.VI ? user.genderData.valueVi : user.genderData.valueEn}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => this.handleUpdateUser(user)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => this.handleDelete(user.id)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
