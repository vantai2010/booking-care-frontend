import axios from 'axios';

let handleLoginService = (email, password) => {
    return axios.post('http://localhost:5000/api/auth/login', { email, password })
}

let getAllUsersService = (id) => {
    return axios.get(`http://localhost:5000/api/get-all-users/${id}`)
}

let createNewUserService = (data) => {
    return axios.post('http://localhost:5000/api/create-new-user', data)
}

let deleteUserService = (id) => {
    return axios.delete(`http://localhost:5000/api/delete-user?id=${id}`)
}

let updateUserService = (data) => {
    return axios.put(`http://localhost:5000/api/update-user?id=${data.id}`, data)
}

let getAllCodeService = (type) => {
    return axios.get(`http://localhost:5000/api/allcode?type=${type}`)
}

let getTopDoctorService = (role) => {
    return axios.get(`http://localhost:5000/api/top-doctor-home?role=${role}`)
}

let getAllDoctorsService = () => {
    return axios.get('http://localhost:5000/api/get-all-doctors')
}

let saveInforDoctorService = (data) => {
    return axios.post('http://localhost:5000/api/save-infor-doctor', data)
}

let getDetailDoctorService = (id) => {
    return axios.get(`http://localhost:5000/api/get-detail-doctor-by-id?id=${id}`)
}

let saveBulkScheduleDoctorService = (data) => {
    return axios.post('http://localhost:5000/api/bulk-create-schedule', data)
}

let getScheduleDoctorByDateService = (data) => {
    return axios.get(`http://localhost:5000/api/get-schedule-doctor-by-date?doctorId=${data.doctorId}&date=${data.date}`)
}

let getInforDoctorById = (id) => {
    return axios.get(`http://localhost:5000/api/get-infor-doctor-by-id?id=${id}`)
}

let getProfileDoctorById = (id) => {
    return axios.get(`http://localhost:5000/api/get-profile-doctor-by-id?id=${id}`)
}

let postBookAppointment = (data) => {
    return axios.post('http://localhost:5000/api/patient-book-appoinment', data)
}

let postVerifyBookAppointment = (data) => {
    return axios.post('http://localhost:5000/api/verify-book-appoinment', data)
}

let createNewSpecialtyService = (data) => {
    return axios.post('http://localhost:5000/api/create-new-specialty', data)
}

let createNewClinicService = (data) => {
    return axios.post('http://localhost:5000/api/create-new-clinic', data)
}

let getAllSpecialtyService = () => {
    return axios.get('http://localhost:5000/api/get-all-specialty')
}

let getDetailSpecialtyByIdService = (id, location) => {
    return axios.get(`http://localhost:5000/api/get-detail-specialty-by-id?id=${id}&location=${location}`)
}

let getAllClinicService = () => {
    return axios.get('http://localhost:5000/api/get-all-clinic')
}


let getDetailClinicByIdService = (id) => {
    return axios.get(`http://localhost:5000/api/get-detail-by-id-clinic?id=${id}`)
}

let getAllPatientForDoctorService = (data) => {
    return axios.get(`http://localhost:5000/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

let sendRemedyService = (data) => {
    return axios.post('http://localhost:5000/api/send-remedy', data)
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