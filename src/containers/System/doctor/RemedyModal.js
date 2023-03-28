import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../../utils/emitter';
import { toast } from 'react-toastify';
import { languages } from '../../../utils/constant';
import './RemedyModal.scss';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageBase64: '',
        }
    }



    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleImage = async e => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }



    render() {
        let { data, sendRemedy, close } = this.props
        return (
            <Modal
                isOpen={this.props.isOpen}
                className={this.props.className}
                size={'md'}
            >
                <ModalHeader><FormattedMessage id="modal.titleConfirm" /></ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6">
                            <label><FormattedMessage id="modal.send-to" /></label>
                            <p>{data.email}</p>
                        </div>

                        <div className="col-6">
                            <label><FormattedMessage id="modal.choose-image" style={{ overFlow: 'hidden' }} /></label>
                            <input type="file" onChange={e => this.handleImage(e)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => close()}>
                        <FormattedMessage id="modal.close" />
                    </Button>
                    <Button color="primary" onClick={() => sendRemedy(this.state.imageBase64)}>
                        <FormattedMessage id="modal.send" />
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
