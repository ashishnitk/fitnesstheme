import React, { Component } from 'react';
import { connect } from "react-redux";
import store from "./store"
import Beauty from "./components/layouts/beauty/main"
import { fetchAccessToken, getAllProducts, fetchBanners, fetchBlogs, fetchUserInfo, fetchSubDomain } from "./actions/index"
import { IntlProvider } from 'react-redux-multilingual';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import translations from './constants/translations'

//Collection Pages
import CollectionNoSidebar from "./components/collection/collection-no-sidebar";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";
import NoSideBar from "./components/products/no-sidebar";

// Features
import Layout from './components/app'
import Cart from './components/cart'
import Compare from './components/compare/index'
import wishList from './components/wishlist'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'
import placeOrder from './components/checkout/place-order'

// Extra Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import lookbook from './components/pages/lookbook'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Search from './components/pages/search'
import Collection from './components/pages/collection'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard'
import Faq from './components/pages/faq'

// Blog Pages
import RightSide from './components/blogs/right-sidebar'
import Details from './components/blogs/details'
import BlogPage from './components/blogs/blog-page'

// Gallery Pages
import GalleryPage from './components/gallery/gallery-page'
import GalleryDetails from './components/gallery/gallery-details'

// Theme Element
import ElementTitle from "./components/features/theme/element-title"
import ElementBanner from "./components/features/theme/element-banner";
import ElementSlider from "./components/features/theme/element-slider";
import ElementCategory from "./components/features/theme/element-category";
import ElementService from "./components/features/theme/element-service";
import ElementRatio from "./components/features/theme/element-ratio";

// Product Elements
import ElementProductBox from "./components/features/product/element-product-box"
import ElementProductSlider from "./components/features/product/element-product-slider"
import ElementProductNoSlider from "./components/features/product/element-product-no-slider"
import ElementMultipleSlider from "./components/features/product/element-multiple-slider"
import ElementProductTab from "./components/features/product/element-product-tab"

// Portfolio Features
import GridCols from "./components/features/portfolio/grid-cols"
import MasonaryGridCols from "./components/features/portfolio/masonary-grid-cols"
import { getSubdomain } from './services/subDomainHelper';

class Home extends Component {

    // constructor(props){
    //     super(props)

    //     this.state = {
    //         open: false
    //     }
    // }

    componentDidMount() {

        let domain = "http://" + getSubdomain()
        store.dispatch(fetchAccessToken(domain))
    }
    render() {

        const { items, error } = this.props      
        if (error) {
            return (<div>Error</div>)
        }

        return (
            <IntlProvider translations={translations} locale='en'> 
            {items.length ? 
                <BrowserRouter basename={'/'} >
                    <ScrollContext>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Beauty} />
                            <Layout>
                                {/*Routes For Features (Product Collection) */}
                                <Route path={`${process.env.PUBLIC_URL}/shop/collection`} component={CollectionNoSidebar} />

                                {/*Routes For Single Product*/}
                                <Route path={`${process.env.PUBLIC_URL}/collection/product/:_id`} component={LeftSideBar} />
                                <Route path={`${process.env.PUBLIC_URL}/no-sidebar/product/:_id`} component={NoSideBar} />


                                {/*Routes For custom Features*/}
                                <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart} />
                                <Route path={`${process.env.PUBLIC_URL}/wishlist`} component={wishList} />
                                <Route path={`${process.env.PUBLIC_URL}/compare`} component={Compare} />
                                <Route path={`${process.env.PUBLIC_URL}/checkout`} component={checkOut} />
                                <Route path={`${process.env.PUBLIC_URL}/place-order`} component={placeOrder} />
                                {/* <Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess} /> */}
                                <Route path={`${process.env.PUBLIC_URL}/order/:id`} component={orderSuccess} />

                                <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={aboutUs} />

                                {/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/about-us`} component={aboutUs} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/lookbook`} component={lookbook} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/login`} component={Login} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/register`} component={Register} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/search`} component={Search} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/collection`} component={Collection} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} component={ForgetPassword} />
                                <Route path={`${process.env.PUBLIC_URL}/contact`} component={Contact} />
                                <Route path={`${process.env.PUBLIC_URL}/pages/dashboard`} component={Dashboard} />
                                <Route path={`${process.env.PUBLIC_URL}/faq`} component={Faq} />

                                {/*Features*/}
                                {/*Theme Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-title`} component={ElementTitle} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-banner`} component={ElementBanner} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-slider`} component={ElementSlider} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-category`} component={ElementCategory} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-service`} component={ElementService} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-ratio`} component={ElementRatio} />

                                {/*Product Elements*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-box`} component={ElementProductBox} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-slider`} component={ElementProductSlider} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-no-slider`} component={ElementProductNoSlider} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-multiple-slider`} component={ElementMultipleSlider} />
                                <Route path={`${process.env.PUBLIC_URL}/features/element-product-tab`} component={ElementProductTab} />

                                {/*Portfolios*/}
                                <Route path={`${process.env.PUBLIC_URL}/features/portfolio-grid/:columns`} component={GridCols} />
                                <Route path={`${process.env.PUBLIC_URL}/features/portfolio-masonary/:columns`} component={MasonaryGridCols} />

                                {/*Blog Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/blog/collection`} component={RightSide} />
                                <Route path={`${process.env.PUBLIC_URL}/blog/details/:_id`} component={Details}/>
                    {/* <Route path={`${process.env.PUBLIC_URL}/blog/blog-page`} component={BlogPage}/> */}
                                <Route path={`${process.env.PUBLIC_URL}/gallery/collection`} component={GalleryPage} />
                                <Route path={`${process.env.PUBLIC_URL}/gallery/details/:_id`} component={GalleryDetails} />
                                {/* <Route exact path="*" component={PageNotFound} /> */}
                            </Layout>
                        </Switch>
                    </ScrollContext>
                </BrowserRouter> : "" }
            </IntlProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.authInfo.error,
        items: state.data.products,
        authLoading: state.authInfo.loading
    }
}

export default connect(mapStateToProps)(Home);
