import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import ThemeSettings from "../../common/theme-settings"
import { connect } from "react-redux";
import store from "../../../store"
import { fetchAccessToken, getAllProducts, fetchBanners, fetchUserInfo, fetchBlogs } from "../../../actions"
import { ToastContainer } from 'react-toastify';

// Import custom components
import {
    svgFreeShipping,
    svgservice,
    svgoffer,
    svgpayment
} from "../../../services/script"
import TopCollection from "../common/collection"
import NewProduct from "../../common/new-product"
import Instagram from "../common/instagram"
import HeaderOne from "../../common/headers/header-one"
import FooterOne from "../../common/footers/footer-one"
import BlogSection from "../common/blogsection";

class Beauty extends Component {
    constructor(props){
        super(props)

        this.state = {
            open: false
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color3.css` );
    }


    
    render() {
        const { aboutUs, Logo, favImage, storeName, items, blogs, imageUrl, loading, error } = this.props


        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
          };

        if (error) {
            
           return <alert>Problem with the website</alert> 
        }
        return (
            <div>
                <Helmet>
                    <title>{storeName}</title>
                    <link id="favicon" rel="shortcut icon" type="image/x-icon" href={favImage} sizes="16X16" />
                </Helmet>
                {/* <HeaderOne logoName={'layout3/logo.png'}/> */}
                <HeaderOne logoName={Logo}/>
                <section className="p-0">
                    <Slider className="slide-1 home-slider" {...settings}>
                        {items.map((banner, index) =>
                            <div key={index}>
                                <div className="home">
                                    <div className="container">
                                        <div className="row">
                                            
                                                <div className="slider-contain">
                                                    <img src={banner.imageModel.large} className="img-fluid" alt="" />

                                                    {/* <div>
                                                                <h4>welcome to beauty</h4>
                                                                <h1>beauty products</h1><a href="#" className="btn btn-solid">shop
                                                                now</a></div> */}
                                                </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </Slider>
                </section>


                {/*About Section*/}
                <section className="beauty-about">
                    <div className="container">

                        {imageUrl ? <div className="row">
                            <div className="col-xl-5 col-lg-6 col-md-12 offset-xl-1 text-center">
                                <img src={`${imageUrl}`} alt="" className="img-fluid blur-up lazyload" />
                            </div>
                            <div className="col-xl-5 col-lg-6 col-md-12">
                                <div className="about-section">
                                    <div>
                                        <h2>about us </h2> <br></br>
                                        <div className="about-text" >
                                            {/* <div dangerouslySetInnerHTML={{ __html: aboutUs }} /> */}
                                            {aboutUs}
                                        </div>
                                        {/* <div className="service small-section pb-0">
                                            <div className="row">
                                                <div className="col-sm-4 service-block1">
                                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                                    <h5>free shipping</h5>
                                                </div>
                                                <div className="col-sm-4 service-block1">
                                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                                    <h5>24 X 7 service</h5>
                                                </div>
                                                <div className="col-sm-4 service-block1">
                                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                                    <h5>festival offer</h5>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="row">
                                <div className="col-xl-12 col-lg-6 col-md-12">
                                    <div className="about-section">
                                        <div>
                                            <h2>about us </h2> <br></br>
                                            <div className="about-text" >
                                                {/* <div dangerouslySetInnerHTML={{ __html: aboutUs }} /> */}
                                                {aboutUs}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </section>
                {/*About Section End*/}

                {/*Product slider*/}
                <TopCollection type={'beauty'} />
                {/*Product slider End*/}

                {/*Video Section*/}
                {/* <section className="video-section pt-0">
                    <div className="title1">
                        <h4>special offer</h4>
                        <h2 className="title-inner1">product tutorial</h2>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <a href="javascript:void(0)" onClick={this.onOpenModal}>
                                    <div className="video-img">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/beauty/video_1.jpg`} alt="" className="img-fluid blur-up lazyload" />
                                        <div className="play-btn">
                                            <span><i className="fa fa-play" aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                </a>
                                <Modal
                                    open={this.state.open}
                                    onClose={this.onCloseModal}
                                    id="video"
                                    className="modal fade video-modal" center>
                                    <iframe src="https://www.youtube.com/embed/FRIDLxM8Roc"
                                            allowFullScreen></iframe>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/*Video Section End*/}

                {/*Product slider*/}
                {/* <TopCollection type={'beauty'} /> */}
                {/*Product slider End*/}

                {/*Blog Section*/}
                {blogs.length ?
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="title1">
                                    <h4>Recent Story</h4>
                                    <h2 className="title-inner1">from the blog</h2>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
                {blogs.length ?
                    <section className="blog p-t-0 ratio3_2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <BlogSection />
                                </div>
                            </div>
                        </div>
                    </section> : ""}
                {/*Blog Section end*/}


                {/*Instagram Section*/}
                {blogs.length ?
                    <div className="section-b-space">
                        <Instagram type="watch" />
                    </div> : ""}
                {/*Instagram Section End*/}

                <FooterOne logoName={Logo} />
                <ToastContainer/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        aboutUs: state.userInfo.user.shortBio,
        imageUrl: state.userInfo.user.imageUrl,
        Logo: state.userInfo.user.logoImage.actual,
        favImage : state.userInfo.user.favImage.small,
        storeName: state.userInfo.user.name,
        items: state.bannerInfo.banners,
        blogs: state.blogInfo.blogs,
        loading: state.authInfo.loading,
        error: state.authInfo.error
    }
}


export default connect(mapStateToProps)(Beauty);