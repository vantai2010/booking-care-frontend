import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorManage.scss'
import { languages, manageActions } from '../../../utils/constant'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { fetchAllDoctors, saveInforDoctor, getRequiredDoctorInfor } from '../../../store/actions/adminActions';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import { getDetailDoctorService } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            optionDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: {},
            selectedPayment: {},
            selectedProvince: {},
            selectedSpecialty: {},
            selectedClinic: {},
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.getAllDoctors()
        this.props.getRequiredDoctorInfor()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctors !== this.props.listDoctors) {
            let obtions = this.buildDataInputSelect(this.props.listDoctors, 'USERS')
            this.setState({
                optionDoctors: obtions
            })
        }
        if (prevProps.language !== this.props.language) {
            let obtions = this.buildDataInputSelect(this.props.listDoctors, 'USERS')
            let dataSelectedSpecialty = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resSpecialty, 'SPECIALTY')
            let dataSelectedPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPrice, 'PRICE')
            let dataSelectedClinic = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resClinic, 'CLINIC')
            let dataSelectedPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPayment)
            let dataSelectedProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resProvince)

            this.setState({
                optionDoctors: obtions,
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectedClinic
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let dataSelectedSpecialty = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resSpecialty, 'SPECIALTY')
            let dataSelectedPrice = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPrice, 'PRICE')
            let dataSelectedClinic = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resClinic, 'CLINIC')
            let dataSelectedPayment = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPayment)
            let dataSelectedProvince = this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resProvince)

            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectedClinic
            })
        }
    }

    buildDataInputSelect = (list, type) => {
        let arrObtion = []
        let { language } = this.props
        if (list && list.length > 0 && type === 'SPECIALTY') {
            list.map(item => {
                let object = {}
                object.value = item.id
                object.label = item.name
                arrObtion.push(object)
            })
        } else if (list && list.length > 0 && type === 'CLINIC') {
            list.map((item, index) => {
                let object = {}
                object.label = item.name
                object.value = item.id
                arrObtion.push(object)
            })
        } else if (list && list.length > 0) {
            list.map((item, index) => {
                let object = {}
                let nameVI = type === 'USERS' ? `${item.lastName} ${item.firstName}` : type === 'PRICE' ? item.valueVi + ' VND' : item.valueVi
                let nameEN = type === 'USERS' ? `${item.firstName} ${item.lastName}` : type === 'PRICE' ? item.valueEn + ' USD' : item.valueEn
                object.value = type === 'USERS' ? item.id : item.keyMap
                object.label = language === languages.VI ? nameVI : nameEN
                arrObtion.push(object)
            })
        }


        return arrObtion
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })

    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        let response = await getDetailDoctorService(selectedDoctor.value)
        let { listPrice, listProvince, listPayment, listSpecialty, listClinic } = this.state

        if (response.data && response.data.errCode === 0 && response.data.data.markdownData) {

            let addressClinic = '', nameClinic = '', note = '', specialtyFind = {}, paymentFind = {}, priceFind = {}, provinceFind = {}, clinicFind = {}

            if (response.data.data.doctorInforData) {
                console.log(response.data.data.doctorInforData)
                addressClinic = response.data.data.doctorInforData.addressClinic
                nameClinic = response.data.data.doctorInforData.nameClinic
                note = response.data.data.doctorInforData.note

                paymentFind = listPayment.find(item => item.value === response.data.data.doctorInforData.paymentId)
                priceFind = listPrice.find(item => item.value === response.data.data.doctorInforData.priceId)
                provinceFind = listProvince.find(item => item.value === response.data.data.doctorInforData.provinceId)
                specialtyFind = listSpecialty.find(item => item.value === response.data.data.doctorInforData.specialtyId)
                clinicFind = listClinic.find(item => item.value === response.data.data.doctorInforData.clinicId)

            }

            this.setState({
                contentHTML: response.data.data.markdownData.contentHTML,
                contentMarkdown: response.data.data.markdownData.contentMarkdown,
                description: response.data.data.markdownData.description,
                hasOldData: true,
                addressClinic,
                nameClinic,
                note,
                selectedPrice: priceFind,
                selectedPayment: paymentFind,
                selectedProvince: provinceFind,
                selectedSpecialty: specialtyFind,
                selectedClinic: clinicFind
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: {},
                selectedPayment: {},
                selectedProvince: {},
                selectedSecialty: {},
                selectedClinic: {}
            })
        }
    };

    handleChangeSelectedDoctorInfor = (selected, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name.name] = selected
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeText = (event, type) => {

        this.setState({
            [type]: event.target.value
        })
    }

    handleSave = () => {
        if (!this.state.selectedDoctor || !this.state.selectedPrice || !this.state.selectedPayment || !this.state.selectedProvince || !this.state.nameClinic || !this.state.addressClinic || !this.state.selectedClinic || !this.state.selectedSpecialty) {
            return toast.error(this.props.language === languages.EN ? "Missing information !!!" : "Vui lòng điền các thông tin bắt buộc !!!")
        }
        let { hasOldData } = this.state
        let data = {
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? manageActions.EDIT : manageActions.ADD,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        }
        this.props.handleSaveInforDoctor(data)
    }

    render() {
        return (
            <div className="mangage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className="more-infor">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.optionDoctors}
                        />
                    </div>
                    <div className="content-right">
                        <lable><FormattedMessage id="admin.manage-doctor.intro" /></lable>
                        <textarea className="form-control" row="4"
                            value={this.state.description}
                            onChange={(e) => this.handleOnchangeText(e, 'description')}
                        >

                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={this.state.listPrice}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={this.state.listPayment}
                            name="selectedPayment"

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.choose-province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={this.state.listProvince}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input className="form-control"
                            value={this.state.nameClinic}
                            onChange={(e) => this.handleOnchangeText(e, 'nameClinic')} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input className="form-control"
                            value={this.state.addressClinic}
                            onChange={(e) => this.handleOnchangeText(e, 'addressClinic')} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            value={this.state.note}
                            onChange={(e) => this.handleOnchangeText(e, 'note')} />
                    </div>

                    <div className="col-6 my-2">
                        <label><FormattedMessage id='admin.manage-doctor.choose-specialty' /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={this.state.listSpecialty}
                            name="selectedSpecialty"
                        />
                    </div>

                    <div className="col-6 my-2">
                        <label><FormattedMessage id="admin.manage-doctor.choose-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={this.state.listClinic}
                            name="selectedClinic"
                        />
                    </div>

                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>
                <div className="btn-container">
                    <button className="btn-save" onClick={() => this.handleSave()}>
                        {this.state.hasOldData ? <FormattedMessage id="admin.manage-doctor.add" /> : <FormattedMessage id="admin.manage-doctor.save" />}
                    </button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctors: state.admin.listDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(fetchAllDoctors()),
        handleSaveInforDoctor: (data) => dispatch(saveInforDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
