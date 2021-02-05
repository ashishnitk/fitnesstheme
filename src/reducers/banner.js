import { FETCH_BANNER_INFO_BEGIN, FETCH_BANNER_INFO_SUCCESS, FETCH_BANNER_INFO_FAIL } from "../constants/ActionTypes";


const initialState = {
    banners: [],
    loading: false,
    error: null
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BANNER_INFO_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_BANNER_INFO_SUCCESS:
            return { ...state,
                banners: action.payload, loading: false };
        case FETCH_BANNER_INFO_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
};
export default bannerReducer;