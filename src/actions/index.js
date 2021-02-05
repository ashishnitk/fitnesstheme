import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import store from "../store";
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import axiosInstance from '../services/interceptor'
import configData from '../config.json'
import qs from 'qs'

export const fetchUserInfo = () => async (dispatch) => {

    try {
        dispatch({ type: types.FETCH_USER_INFO_BEGIN })
        const { data } = await axiosInstance.get(`${configData.NEW_API_URL}/Merchants/${localStorage.getItem("username")}`)

        dispatch({ 
            type: types.FETCH_USER_INFO_SUCCESS,
            payload: data
        })
        
    } catch (error) {

        dispatch({
            type: types.FETCH_USER_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const fetchBanners = () => async (dispatch) => {

    try {
        console.log(`${configData.NEW_API_URL}/Images/background/${localStorage.getItem("username")}`);
        dispatch({ type: types.FETCH_BANNER_INFO_BEGIN })
        const { data } = await axiosInstance.get(`${configData.NEW_API_URL}/Images/background/${localStorage.getItem("username")}`)

        dispatch({ 
            type: types.FETCH_BANNER_INFO_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        console.log('ashish');
        console.log(error);
        dispatch({
            type: types.FETCH_BANNER_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const fetchBlogs = () => async (dispatch) => {

    try {
        dispatch({ type: types.FETCH_BLOG_INFO_BEGIN })
        const { data } = await axiosInstance.get(`${configData.NEW_API_URL}/BlogPosts/list/${localStorage.getItem("username")}?limit=15`)

        dispatch({ 
            type: types.FETCH_BLOG_INFO_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: types.FETCH_BLOG_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const fetchGallery = () => async (dispatch) => {

    try {
        dispatch({ type: types.FETCH_GALLERY_INFO_BEGIN })
        const { data } = await axiosInstance.get(`${configData.NEW_API_URL}/Albums/merchant/${localStorage.getItem("username")}`)

        dispatch({ 
            type: types.FETCH_GALLERY_INFO_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: types.FETCH_GALLERY_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const getAllProducts = () => async(dispatch) => {

    try {
        dispatch({ type: types.FETCH_PRODUCT_INFO_BEGIN })
        const { data } = await axiosInstance.get(`${configData.NEW_API_URL}/Products/${localStorage.getItem("username")}/list?limit=15`)
        dispatch({ 
            type: types.FETCH_PRODUCT_INFO_SUCCESS,
            products: data
        })
        
        
    } catch (error) {

        dispatch({
            type: types.FETCH_PRODUCT_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})

export const fetchAccessToken = (domain) => async (dispatch) => {

    try {
        dispatch({ type: types.FETCH_ACCESS_TOKEN_BEGIN })
        await axios({
            method: 'post',
            url: `${configData.AUTH_API_URL}`,
            data: qs.stringify({
                grant_type: 'client_credentials',
                scope: 'api.read',
                client_id: 'ewnsapi',
                client_secret: 'Laxmidevi@99'
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            if (res.status === 200) {
                let token = res.data.access_token
                localStorage.setItem("token", token)
            }
        })

        dispatch({ type: types.FETCH_ACCESS_TOKEN_SUCCESS})
        store.dispatch(fetchSubDomain(domain))
        
    } catch (error) {

        dispatch({
            type: types.FETCH_ACCESS_TOKEN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const fetchOrderStatus = (orderId) => async (dispatch) => {

    try {
        dispatch({ type: types.FETCH_ORDER_STATUS_BEGIN })
        await axiosInstance({
            method: 'get',
            url: `${configData.NEW_API_URL}/Guests/order/${orderId}`,
        }).then(res => {
            if (res.status === 200) {
                let orderStatus = res.data
                localStorage.setItem("orderStatus", orderStatus)
            }
            else {
                localStorage.setItem("orderStatus", "")
            }
        })

        dispatch({ type: types.FETCH_ORDER_STATUS_SUCCESS})
        
    } catch (error) {
        localStorage.setItem("orderStatus", "")

        dispatch({
            type: types.FETCH_ORDER_STATUS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}

export const fetchSubDomain = (domain) => async (dispatch) => {
    try {
        dispatch({ type: types.FETCH_SUBDOMAIN_BEGIN})
        await axiosInstance({
            method: 'post',
            url: `${configData.NEW_API_URL}/Internal/domains`,
            data: {
                url: `http://tssportsfitness.emartshop.in/`,
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                let username = res.data
                localStorage.setItem("username", username)
            }
        })
        dispatch({ 
            type: types.FETCH_SUBDOMAIN_SUCCESS,
        })
        store.dispatch(fetchBanners())
        store.dispatch(fetchBlogs())
        store.dispatch(fetchUserInfo())
        store.dispatch(getAllProducts())
        store.dispatch(fetchGallery())
        
    } catch (error) {
        dispatch({
            type: types.FETCH_SUBDOMAIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
        
    }
}




//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
        dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});
export const removeFromCart = product_id => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const resetCart = () => (dispatch) => {
    dispatch({
        type: types.RESET_CART,
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};



//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});

