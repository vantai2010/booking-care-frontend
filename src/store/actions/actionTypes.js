const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS',
    FETCH_LOGIN_FAILED: 'FETCH_LOGIN_FAILED',

    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    FETCH_GET_LIST_GENDERS_SUCCESS: 'FETCH_GET_LIST_GENDERS_SUCCESS',
    FETCH_GET_LIST_GENDERS_FAILED: 'FETCH_GET_LIST_GENDERS_FAILED',
    FETCH_GET_LIST_ROLES_SUCCESS: 'FETCH_GET_LIST_ROLES_SUCCESS',
    FETCH_GET_LIST_ROLES_FAILED: 'FETCH_GET_LIST_ROLES_FAIL',
    FETCH_GET_LIST_POSITIONS_SUCCESS: 'FETCH_GET_LIST_POSITIONS_SUCCESS',
    FETCH_GET_LIST_POSITIONS_FAILED: 'FETCH_GET_LIST_POSITIONS_FAIL',


    FETCH_ALL_DOCTORS_SUCCESS: 'FETCH_ALL_DOCTORS_SUCCESS',
    FETCH_ALL_DOCTORS_FAILED: 'FETCH_ALL_DOCTORS_FAILED',

    SAVE_INFOR_DOCTORS_SUCCESS: 'SAVE_INFOR_DOCTORS_SUCCESS',
    SAVE_INFOR_DOCTORS_FAILED: 'SAVE_INFOR_DOCTORS_FAILED',

    FETCH_DETAIL_DOCTOR: "FETCH_DETAIL_DOCTOR",
    FETCH_DETAIL_DOCTOR_SUCCESS: "FETCH_DETAIL_DOCTOR_SUCCESS",
    FETCH_DETAIL_DOCTOR_FAILED: "FETCH_DETAIL_DOCTOR_FAILED",

    FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_HOURS_FAILED: 'FETCH_ALLCODE_SCHEDULE_HOURS_FAILED',

    GET_REQUIRED_DOCTOR_INFOR_SUCCESS: 'GET_REQUIRED_DOCTOR_INFOR_SUCCESS',
    GET_REQUIRED_DOCTOR_INFOR_FAILED: 'GET_REQUIRED_DOCTOR_INFOR_FAILED',


})

export default actionTypes;