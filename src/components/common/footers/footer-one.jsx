import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getLatestFiveProducts } from '../../../services/index'
import configData from '../../../config.json'
import axiosInstance from '../../../services/interceptor'
import { SlideUpDown } from "../../../services/script"
import LogoImage from "../headers/common/logo"
import { toast } from 'react-toastify';

class FooterOne extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: ''
        }
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        axiosInstance({
            method: 'post',
            url: `${configData.NEW_API_URL}/Internal/subscribers`,
            data: this.state,
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 201) {
                toast.success("Subscribed Successfully. Thank You")
                this.resetForm()
            }
        }).catch(error => {
            toast.error("Something went wrong. Please try again")
        })
    }

    resetForm() {
        this.setState({ email: '', username: '' })
    }

    componentDidMount() {
        const { userProfile } = this.props
        this.setState({ username: userProfile.username })
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }


    render() {

        const { userProfile, items } = this.props
        return (
            <footer className="">
                <div className="white-layout">
                    <div className="container">
                        <section className="small-section border-section border-top-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="subscribe">
                                        <div>
                                            <h4>KNOW IT ALL FIRST!</h4>
                                            <p>Never Miss Anything From {userProfile.name} By Signing Up To Our Newsletter. </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="section-b-space darken-layout">
                    <div className="container f-container">
                        <div className="row footer-theme partition-f">

                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-logo">
                                        <LogoImage logo={this.props.logoName} />
                                    </div>
                                    <div className="footer-contant">
                                        <ul className="contact-list">
                                            <li><i className="fa fa-map-marker"></i>{userProfile.address} {userProfile.locality},
                                            {userProfile.City}
                                            </li>
                                            <li><i className="fa fa-phone"></i>Call Us: {userProfile.countryCode} {userProfile.mobileNumber}</li>
                                            <li><i className="fa fa-envelope-o"></i>Email Us: <a
                                                href="#">{userProfile.email}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>New Products</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            {items.map((product, index) =>
                                                <li key={index}>
                                                    <Link to={`${process.env.PUBLIC_URL}/collection/product/${product._id}`} >{product.name}</Link>
                                                </li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>why we choose</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <ul>
                                            <li><a href="#">shipping & return</a></li>
                                            <li><a href="#">secure shopping</a></li>
                                            <li><a href={`${process.env.PUBLIC_URL}/gallery/collection`}>image gallery</a></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/about-us`}>about us</Link></li>
                                            <li><Link to={`${process.env.PUBLIC_URL}/contact`}>contact</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="col">
                                <div className="sub-title">
                                    <div className="footer-title">
                                        <h4>Newsletter</h4>
                                    </div>
                                    <div className="footer-contant">
                                        <form id="subscribe-form" className="form-inline subscribe-form" onSubmit={this.handleSubmit.bind(this)}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleFormControlInput1" value={this.state.email}
                                                    onChange={this.onEmailChange.bind(this)} placeholder="Enter your email" required />
                                            </div>
                                            <button type="submit" className="btn btn-solid">subscribe</button>
                                        </form>
                                        <div className="footer-social">
                                            <ul class="list-inline d-flex mb-0">
                                                <li class="list-inline-item">
                                                    Follow us:
                                                </li>
                                                <li class="list-inline-item">
                                                    <Link to={'https://www.facebook.com/'} ><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                                                </li>
                                                <li class="list-inline-item">
                                                    <Link to={'https://plus.google.com/'} ><i className="fa fa-google-plus" aria-hidden="true"></i></Link>
                                                </li>
                                                <li class="list-inline-item">
                                                    <Link to={'https://twitter.com'}><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                                                </li>
                                                <li class="list-inline-item">
                                                    <Link to={'https://instagram.com'}><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>








                        </div>
                    </div>
                </section>
                <div className="sub-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="footer-end">
                                    <p><i className="fa fa-copyright" aria-hidden="true"></i>{userProfile.name}</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-6 col-sm-12">
                                <div className="payment-card-bottom">
                                    <ul>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/visa.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/mastercard.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/paypal.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/american-express.png`} alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/icon/discover.png`} alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userProfile: state.userInfo.user,
        items: getLatestFiveProducts(state.data.products)
    }
}

export default connect(mapStateToProps)(FooterOne);