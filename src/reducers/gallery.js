import { FETCH_GALLERY_INFO_BEGIN, FETCH_GALLERY_INFO_SUCCESS, FETCH_GALLERY_INFO_FAIL } from "../constants/ActionTypes";


const initialState = {
    albums: [],
    loading: false,
    error: null
};

const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GALLERY_INFO_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_GALLERY_INFO_SUCCESS:
            return { ...state,
                albums: action.payload, loading: false};
        case FETCH_GALLERY_INFO_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
};
export default galleryReducer;