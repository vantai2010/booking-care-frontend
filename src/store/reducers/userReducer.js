import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfor: null,
    test: 12
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfor: action.data,
                isLoggedIn: true
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        default:
            return state;
    }
}

export default userReducer;