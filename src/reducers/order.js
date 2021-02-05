import { FETCH_ORDER_STATUS_BEGIN, FETCH_ORDER_STATUS_SUCCESS, FETCH_ORDER_STATUS_FAIL } from "../constants/ActionTypes";

const initialState = {
    loading: false,
    error: null
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_STATUS_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_ORDER_STATUS_SUCCESS:
            return {...state, loading: false}
        case FETCH_ORDER_STATUS_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
};
export default orderReducer;