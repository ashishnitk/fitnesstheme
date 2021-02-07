import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IntlActions } from 'react-redux-multilingual'
import Pace from 'react-pace-progress'

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import { changeCurrency } from '../../../actions'
import { connect } from "react-redux";

class HeaderOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }
    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
        setTimeout(function () {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);

        this.setState({ open: true });
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            } else
                document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        store.dispatch(IntlActions.setLocale(lang))
    }

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if (openmyslide) {
            openmyslide.classList.add('open-side')
        }
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

    load = () => {
        this.setState({ isLoading: true });
        fetch().then(() => {
            // deal with data fetched
            this.setState({ isLoading: false })
        })
    };

    render() {

        const { Logo } = this.props

        return (
            <div>
                <header id="sticky" className="sticky">
                    {this.state.isLoading ? <Pace color="#27ae60" /> : null}
                    <div className="mobile-fix-option"></div>
                    {/*Top Header Component*/}
                    {/* <TopBar/> */}

                    <div className="container">
                        <div className="row d-flex align-items-center content-header-top">
                            <div className="col-xl-4 col-lg-7 col-md-9 d-flex align-items-center justify-content-between header-top-left">
                                    <div className="menu-left">
                                        <div className="brand-logo">
                                            <LogoImage logo={Logo} />
                                        </div>
                                    </div>                               
                            </div>

                            <div className="col-xl-4 col-lg-5 col-md-3 d-flex align-items-center justify-content-end">
                            <div className="main-menu"><div className="menu-right pull-right">
                                    {/*Top Navigation Bar Component*/}
                                    <NavBar />
                                    <div>
                                        <div className="icon-nav">
                                            <ul>
                                                <li className="onhover-div mobile-search">
                                                    <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`} onClick={this.openSearch} className="img-fluid" alt="" />
                                                        <i className="fa fa-search" onClick={this.openSearch}></i></div>
                                                </li>
                                                {/* <li className="onhover-div mobile-setting">
														<div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
															<i className="fa fa-cog"></i></div>
														<div className="show-div setting">
															<h6>language</h6>
															<ul>
																<li><a href={null} onClick={() => this.changeLanguage('en')}>English</a> </li>
																<li><a href={null} onClick={() => this.changeLanguage('fn')}>French</a> </li>
															</ul>
															<h6>currency</h6>
															<ul className="list-inline">
																<li><a href={null} onClick={() => this.props.changeCurrency('€')}>euro</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('₹')}>rupees</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('£')}>pound</a> </li>
																<li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li>
															</ul>
														</div>
													</li> */}
                                                {/*Header Cart Component */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </div></div>

                            <div className="col-xl-4 col-lg-5 col-md-3 d-flex align-items-center justify-content-end header-top-right">
                                <div className="col-lg-6 text-right">
                                    <ul className="header-dropdown">
                                        {/* <li className="mobile-wishlist compare-mobile"><Link to={`${process.env.PUBLIC_URL}/compare`}><i className="fa fa-random" aria-hidden="true"></i>Compare</Link></li> */}

                                        <li className="onhover-dropdown mobile-account">
                                            <i className="fa fa-user" aria-hidden="true" style={{ fontSize: 30, color: '#ffd80a' }}></i>
                                            <ul className="onhover-show-div">
                                                <li>
                                                    <Link to={`${process.env.PUBLIC_URL}/pages/login`} data-lng="en">Sign In</Link>
                                                </li>
                                                <li>
                                                    <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Sign Up</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="mobile-wishlist" style={{ marginLeft: 10 }}><CartContainer /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <form>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search a Product" />
                                            </div>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Logo: state.userInfo.user.logoImage.small,
    }
}

export default connect(mapStateToProps,
    { changeCurrency }
)(HeaderOne);