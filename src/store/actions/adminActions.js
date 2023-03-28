import { toast } from 'react-toastify'
import actionTypes from './actionTypes'
import {
    getTopDoctorService, getAllCodeService, getAllDoctorsService, saveInforDoctorService, getDetailDoctorService, getAllSpecialtyService,
    getAllClinicService
} from '../../services/userService'

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getTopDoctorService()
            if (response && response.data.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(response.data.users))
            }
        } catch (error) {
            toast.error("Upload the list doctor error !!!")
            dispatch(fetchTopDoctorFailed())
            console.log(error)
        }
    }
}

export const fetchTopDoctorFailed = () => {
    return {
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
    }
}

export const fetchTopDoctorSuccess = (data) => {
    return {
        type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
        data: data
    }
}

export const fetchListGenders = () => {
    return async (dispatch, getState) => {
        try {
            let listGenders = await getAllCodeService('GENDER')
            if (listGenders && listGenders.data.data) {
                dispatch(fetchListGendersSuccess(listGenders.data.data))

            } else {
                dispatch(fetchListGendersFailed())
            }
        } catch (error) {
            toast.error('ERROR FROM SERVER !!!')
            console.log(error)
            dispatch(fetchListGendersFailed())
        }
    }
}

export const fetchListGendersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GET_LIST_GENDERS_SUCCESS,
        data: data
    }
}

export const fetchListGendersFailed = () => {
    return {
        type: actionTypes.FETCH_GET_LIST_GENDERS_FAILED
    }
}

export const fetchListPositions = () => {
    return async (dispatch, getState) => {
        try {
            let listGenders = await getAllCodeService('POSITION')
            if (listGenders && listGenders.data.data) {
                dispatch(fetchListPositionsSuccess(listGenders.data.data))
            } else {
                dispatch(fetchListPositionsFailed())
            }
        } catch (error) {
            toast.error('ERROR FROM SERVER !!!')
            console.log(error)
            dispatch(fetchListPositionsFailed())
        }
    }
}

export const fetchListPositionsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GET_LIST_POSITIONS_SUCCESS,
        data: data
    }
}

export const fetchListPositionsFailed = () => {
    return {
        type: actionTypes.FETCH_GET_LIST_POSITIONS_FAILED
    }
}


export const fetchListRoles = () => {
    return async (dispatch, getState) => {
        try {
            let listGenders = await getAllCodeService('ROLE')
            if (listGenders && listGenders.data.data) {
                dispatch(fetchListRolesSuccess(listGenders.data.data))
            } else {
                dispatch(fetchListRolesFailed())
            }
        } catch (error) {
            toast.error('ERROR FROM SERVER !!!')
            console.log(error)
            dispatch(fetchListRolesFailed())
        }
    }
}

export const fetchListRolesSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GET_LIST_ROLES_SUCCESS,
        data: data
    }
}

export const fetchListRolesFailed = () => {
    return {
        type: actionTypes.FETCH_GET_LIST_ROLES_FAILED
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllDoctorsService()
            if (response && response.data.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(response.data.data))
            } else {
                dispatch(fetchAllDoctorsFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchAllDoctorsFailed())
        }
    }
}

export const fetchAllDoctorsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
        data
    }
}

export const fetchAllDoctorsFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS
    }
}

export const saveInforDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await saveInforDoctorService(data)
            if (response && response.data && response.data.errCode === 0) {
                toast.success(response.data.messageVI)
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTORS_SUCCESS
                })
            } else {
                toast.error(response.data.messageVI)
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTORS_FAILED
                })
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTORS_FAILED
            })
        }
    }
}

export const fetchDetailDoctor = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.FETCH_DETAIL_DOCTOR
        })
        try {
            let response = await getDetailDoctorService(id)
            if (response && response.data && response.data.errCode === 0) {
                toast.success(response.data.messageVI)
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
                    data: response.data.data
                })
            } else {
                toast.error(response.data.messageVI)
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('error from to server')
            dispatch({
                type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED
            })
        }

    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCodeService('TIME')
            if (response && response.data && response.data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    data: response.data.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {

            let resPrice = await getAllCodeService('PRICE')
            let resProvince = await getAllCodeService('PROVINCE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resSpecialty = await getAllSpecialtyService()
            let resClinic = await getAllClinicService()

            if (resPrice && resPrice.data && resPrice.data.errCode === 0 &&
                resPayment && resPayment.data && resPayment.data.errCode === 0 &&
                resProvince && resProvince.data && resProvince.data.errCode === 0 &&
                resSpecialty && resSpecialty.data && resSpecialty.data.errCode === 0 &&
                resClinic && resClinic.data && resClinic.data.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data.data,
                    resPayment: resPayment.data.data,
                    resProvince: resProvince.data.data,
                    resSpecialty: resSpecialty.data.data,
                    resClinic: resClinic.data.data
                }
                dispatch({
                    type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS,
                    data: data
                })
            } else {
                dispatch({ type: actionTypes.GET_REQUIRED_DOCTOR_INFOR_FAILED })
            }
        } catch (error) {
            console.log(error)

        }
    }
}