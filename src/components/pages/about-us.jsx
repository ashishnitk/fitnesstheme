import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from "react-redux";

class aboutUs extends Component {

    constructor (props) {
        super (props)

    }

    render (){

        const {aboutUs, item} = this.props
        return (
            <div>
                <Breadcrumb title={'About Us'}/>
                {/*about section*/}
                <section className="beauty-about">
                    <div className="container fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="banner-section">
                                    <img src={item.imageModel.large} className="img-fluid" alt=""/>
                                </div>
                            </div>
                            <div className="about-section">
                                    <div>
                                        <br/>
                                        <div className="about-text" dangerouslySetInnerHTML={{ __html: aboutUs }}>
                                            {/* <div dangerouslySetInnerHTML={{ __html: aboutUs }} /> */}
                                            {/* {aboutUs} */}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>

                {/*Testimonial*/}
                {/* <section className="testimonial small-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <Slider {...Slider2} className="slide-2 testimonial-slider no-arrow">
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/2.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="media">
                                            <div className="text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="#" />
                                                    <h5>Mark Jecno</h5>
                                                    <h6>Designer</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>you how all this mistaken idea of denouncing pleasure and praising
                                                    pain was born and I will give you a complete account of the system,
                                                    and expound the actual teachings.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/*Team Section*/}
                <section id="team" className="team section-b-space">
                    {/* <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>Our Team</h2>
                                <Slider {...Team4} className="team-4">
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/team/1.jpg`} className="img-fluid" alt=""/>
                                        <h4>Hileri Keol</h4>
                                        <h6>CEo & Founder At Company</h6>
                                    </div>
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/team/2.jpg`} className="img-fluid" alt=""/>
                                        <h4>Hileri Keol</h4>
                                        <h6>CEo & Founder At Company</h6>
                                    </div>
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/team/3.jpg`} className="img-fluid" alt=""/>
                                        <h4>Hileri Keol</h4>
                                        <h6>CEo & Founder At Company</h6>
                                    </div>
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/team/4.jpg`} className="img-fluid" alt=""/>
                                        <h4>Hileri Keol</h4>
                                        <h6>CEo & Founder At Company</h6>
                                    </div>
                                    <div>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/team/1.jpg`} className="img-fluid" alt=""/>
                                        <h4>Hileri Keol</h4>
                                        <h6>CEo & Founder At Company</h6>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div> */}
                </section>

                {/*service layout*/}
                <div className="container about-cls section-b-space">
                    {/* <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                </div>
                {/*service layout end*/}

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        aboutUs: state.userInfo.user.description,
        item: state.bannerInfo.banners[0]
    }
}

export default connect(mapStateToProps) (aboutUs)