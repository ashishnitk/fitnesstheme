import { FETCH_SUBDOMAIN_BEGIN, FETCH_SUBDOMAIN_SUCCESS, FETCH_SUBDOMAIN_FAIL } from "../constants/ActionTypes";

const initialState = {
    loading: false,
    error: null
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBDOMAIN_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_SUBDOMAIN_SUCCESS:
            return {...state, loading: false}
        case FETCH_SUBDOMAIN_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
};
export default domainReducer;