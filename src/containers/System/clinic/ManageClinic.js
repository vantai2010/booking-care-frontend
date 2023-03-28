import React, { Component } from 'react';
import { connect } from "react-redux";
import { languages } from '../../../utils/constant';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { createNewClinicService } from '../../../services/userService';
import { CommonUtils } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })

    }

    handleOnchangeInput = async (event, key) => {
        if (key === 'file') {
            let data = event.target.files
            let file = data[0]
            if (data) {
                let base64 = await CommonUtils.getBase64(file)
                this.setState({
                    imageBase64: base64
                })
            }
        } else {
            this.setState({
                [key]: event.target.value
            })
        }
    }

    handleSaveClinic = async () => {
        let response = await createNewClinicService(this.state)
        if (response && response.data && response.data.errCode === 0) {
            toast.success(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: ''
            })
        } else {
            toast.error(this.props.language === languages.EN ? response.data.messageEN : response.data.messageVI)

        }
    }

    render() {
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="title"><FormattedMessage id="admin.manage-clinic.title" /></div>

                    <div className="add-new-specialty row">

                        <div className="col-6 form-group">
                            <label><FormattedMessage id="admin.manage-clinic.name" /></label>
                            <input
                                value={this.state.name}
                                onChange={(e) => this.handleOnchangeInput(e, 'name')}
                                type="text" className="form-control"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="admin.manage-clinic.image" /></label>
                            <input
                                onChange={(e) => this.handleOnchangeInput(e, 'file')}
                                type="file" className="form-control-file"
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label><FormattedMessage id="admin.manage-clinic.address" /></label>
                            <input
                                value={this.state.address}
                                onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                type="text" className="form-control"
                            />
                        </div>

                        <div className="col-12">
                            <MdEditor
                                style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12 my-3">
                            <button className="btn btn-primary" onClick={() => this.handleSaveClinic()}><FormattedMessage id="admin.manage-clinic.save" /></button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
