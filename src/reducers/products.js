import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    FETCH_PRODUCT_INFO_BEGIN, FETCH_PRODUCT_INFO_SUCCESS, FETCH_PRODUCT_INFO_FAIL } from "../constants/ActionTypes";


const initialState = {
    products: [],
    symbol: '₹',
    product_details: [],
    loading: false,
    error: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_INFO_BEGIN:
            return {...state, loading: true, error: null};
        case FETCH_PRODUCT_INFO_SUCCESS:
            if (action.products[0].currencyCode == "INR"){
                console.log(action.products[0].currencyCode)
                return { ...state,
                    products: action.products, symbol: '₹', loading: false };
            }
        case FETCH_PRODUCT_INFO_FAIL:
            return {...state, loading: false, error: action.payload}
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state,
                    product_details: singleItem };
            }

        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        default:
            return state;
    }
};
export default productReducer;