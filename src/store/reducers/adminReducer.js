import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    user: {},
    listDoctors: [],
    topDoctors: [],
    listGenders: [],
    listPositions: [],
    listRoles: [],
    detailDoctor: {},
    allScheduleTime: [],

    allRequiredDoctorInfor: {}
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            return {
                ...state,
                topDoctors: []
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data
            }
        case actionTypes.FETCH_GET_LIST_GENDERS_SUCCESS:
            return {
                ...state,
                listGenders: action.data
            }
        case actionTypes.FETCH_GET_LIST_GENDERS_FAILED:
            return {
                ...state,
                listGenders: []
            }
        case actionTypes.FETCH_GET_LIST_POSITIONS_SUCCESS:
            return {
                ...state,
                listPositions: action.data
            }
        case actionTypes.FETCH_GET_LIST_POSITIONS_FAILED:
            return {
                ...state,
                listPositions: []
            }
        case actionTypes.FETCH_GET_LIST_ROLES_SUCCESS:
            return {
                ...state,
                listRoles: action.data
            }
        case actionTypes.FETCH_GET_LIST_ROLES_FAILED:
            return {
                ...state,
                listRoles: []
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                listDoctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            return {
                ...state,
                listDoctors: []
            }
        case actionTypes.FETCH_DETAIL_DOCTOR:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                detailDoctor: action.data
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                detailDoctor: {}
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            return {
                ...state,
                allScheduleTime: action.data
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
            return {
                ...state,
                allScheduleTime: []
            }
        case actionTypes.GET_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }
        case actionTypes.GET_REQUIRED_DOCTOR_INFOR_FAILED:
            return {
                ...state,
                allRequiredDoctorInfor: {}
            }
        default:
            return state;
    }
}

export default appReducer;