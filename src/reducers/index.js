import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import userReducer from './user'
import bannerReducer from './banner'
import blogReducer from './blogs';
import galleryReducer from './gallery'
import authReducer from './auth';
import domainReducer from './subdomain';
import orderReducer from './order';


const rootReducer = combineReducers({
    userInfo: userReducer,
    bannerInfo: bannerReducer,
    data: productReducer,
    cartList: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    blogInfo: blogReducer,
    authInfo: authReducer,
    domainInfo: domainReducer,
    galleryInfo: galleryReducer,
    orderInfo: orderReducer,
    Intl
});

export default rootReducer;