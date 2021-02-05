import { FETCH_USER_INFO_BEGIN, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAIL } from "../constants/ActionTypes";


const initialState = {
    user: {},
    loading: true,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_INFO_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_USER_INFO_SUCCESS:
            return { ...state,
                user: action.payload,loading: false };
        case FETCH_USER_INFO_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
};
export default userReducer;