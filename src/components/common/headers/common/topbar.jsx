import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

class TopBar extends Component {

    render() {
        const {translate, storeName, phone, countryCode} = this.props;
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>Welcome to {storeName}</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i> Call Us: {countryCode} {phone}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                                {/* <li className="mobile-wishlist compare-mobile"><Link to={`${process.env.PUBLIC_URL}/compare`}><i className="fa fa-random" aria-hidden="true"></i>Compare</Link></li> */}
                                <li className="mobile-wishlist"><Link to='#'><i className="fa fa-heart" aria-hidden="true"></i>Wishlist</Link></li>
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <ul className="onhover-show-div">
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/login`} data-lng="en">Sign In</Link>
                                        </li>
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Sign Up</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        storeName: state.userInfo.user.name,
        phone: state.userInfo.user.mobileNumber,
        countryCode: state.userInfo.user.countryCode
    }
}


export default connect(mapStateToProps) (TopBar);