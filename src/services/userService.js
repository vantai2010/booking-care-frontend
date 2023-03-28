import axios from 'axios';
require('dotenv').config()
const URL_BACK_END = process.env.REACT_APP_BACKEND_URL

let handleLoginService = (email, password) => {
    return axios.post(`${URL_BACK_END}/api/auth/login`, { email, password })
}

let getAllUsersService = (id) => {
    return axios.get(`${URL_BACK_END}/api/get-all-users/${id}`)
}

let createNewUserService = (data) => {
    return axios.post(`${URL_BACK_END}/api/create-new-user`, data)
}

let deleteUserService = (id) => {
    return axios.delete(`${URL_BACK_END}/api/delete-user?id=${id}`)
}

let updateUserService = (data) => {
    return axios.put(`${URL_BACK_END}/api/update-user?id=${data.id}`, data)
}

let getAllCodeService = (type) => {
    return axios.get(`${URL_BACK_END}/api/allcode?type=${type}`)
}

let getTopDoctorService = (role) => {
    return axios.get(`${URL_BACK_END}/api/top-doctor-home?role=${role}`)
}

let getAllDoctorsService = () => {
    return axios.get(`${URL_BACK_END}/api/get-all-doctors`)
}

let saveInforDoctorService = (data) => {
    return axios.post(`${URL_BACK_END}/api/save-infor-doctor`, data)
}

let getDetailDoctorService = (id) => {
    return axios.get(`${URL_BACK_END}/api/get-detail-doctor-by-id?id=${id}`)
}

let saveBulkScheduleDoctorService = (data) => {
    return axios.post(`${URL_BACK_END}/api/bulk-create-schedule`, data)
}

let getScheduleDoctorByDateService = (data) => {
    return axios.get(`${URL_BACK_END}/api/get-schedule-doctor-by-date?doctorId=${data.doctorId}&date=${data.date}`)
}

let getInforDoctorById = (id) => {
    return axios.get(`${URL_BACK_END}/api/get-infor-doctor-by-id?id=${id}`)
}

let getProfileDoctorById = (id) => {
    return axios.get(`${URL_BACK_END}/api/get-profile-doctor-by-id?id=${id}`)
}

let postBookAppointment = (data) => {
    return axios.post(`${URL_BACK_END}/api/patient-book-appoinment`, data)
}

let postVerifyBookAppointment = (data) => {
    return axios.post(`${URL_BACK_END}/api/verify-book-appoinment`, data)
}

let createNewSpecialtyService = (data) => {
    return axios.post(`${URL_BACK_END}/api/create-new-specialty`, data)
}

let createNewClinicService = (data) => {
    return axios.post(`${URL_BACK_END}/api/create-new-clinic`, data)
}

let getAllSpecialtyService = () => {
    return axios.get(`${URL_BACK_END}/api/get-all-specialty`)
}

let getDetailSpecialtyByIdService = (id, location) => {
    return axios.get(`${URL_BACK_END}/api/get-detail-specialty-by-id?id=${id}&location=${location}`)
}

let getAllClinicService = () => {
    return axios.get(`${URL_BACK_END}/api/get-all-clinic`)
}


let getDetailClinicByIdService = (id) => {
    return axios.get(`${URL_BACK_END}/api/get-detail-by-id-clinic?id=${id}`)
}

let getAllPatientForDoctorService = (data) => {
    return axios.get(`${URL_BACK_END}/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

let sendRemedyService = (data) => {
    return axios.post(`${URL_BACK_END}/api/send-remedy`, data)
}

export {
    handleLoginService,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    updateUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorsService,
    saveInforDoctorService,
    getDetailDoctorService,
    saveBulkScheduleDoctorService,
    getScheduleDoctorByDateService,
    getInforDoctorById,
    getProfileDoctorById,
    postBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    createNewClinicService,
    getAllClinicService,
    getDetailClinicByIdService,
    getAllPatientForDoctorService,
    sendRemedyService,
}