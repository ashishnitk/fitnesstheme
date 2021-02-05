import { FETCH_BLOG_INFO_BEGIN, FETCH_BLOG_INFO_SUCCESS, FETCH_BLOG_INFO_FAIL } from "../constants/ActionTypes";


const initialState = {
    blogs: [],
    loading: false,
    error: null
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOG_INFO_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_BLOG_INFO_SUCCESS:
            return { ...state,
                blogs: action.payload, loading: false};
        case FETCH_BLOG_INFO_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
};
export default blogReducer;