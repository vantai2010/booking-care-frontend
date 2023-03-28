import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/admin/UserRedux';
import DoctorManage from '../containers/System/admin/DoctorManage';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/clinic/ManageClinic';

class System extends Component {
    render() {

        const { systemMenuPath } = this.props;
        return (
            <>

                <Header />
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/admin/user-manage" component={UserManage} />
                            <Route path="/admin/doctor-manage" component={DoctorManage} />
                            <Route path="/admin/user-redux" component={UserRedux} />
                            <Route path="/admin/manage-specialty" component={ManageSpecialty} />
                            <Route path="/admin/manage-clinic" component={ManageClinic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
