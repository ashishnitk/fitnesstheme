import { FETCH_ACCESS_TOKEN_BEGIN, FETCH_ACCESS_TOKEN_SUCCESS, FETCH_ACCESS_TOKEN_FAIL } from "../constants/ActionTypes";

const initialState = {
    loading: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCESS_TOKEN_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_ACCESS_TOKEN_SUCCESS:
            return {...state, loading: false}
        case FETCH_ACCESS_TOKEN_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
};
export default authReducer;