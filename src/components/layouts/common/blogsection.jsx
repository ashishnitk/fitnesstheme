import React, { Component } from 'react';
import Moment from 'moment'
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Slider3} from "../../../services/script"
import configData from '../../../config.json'

class BlogSection extends Component {
    render (){

        const {items} = this.props;
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Slider {...Slider3} className="slide-3 no-arrow ">
                            {items.map((blog, index) =>
                                <div key={index}>
                                    <div className="col-md-12">
                                        <Link to={`${process.env.PUBLIC_URL}/blog/details/${blog._id}`}>
                                            <div className="classic-effect">
                                                {blog.imageModel ? 
                                                <img src={blog.imageModel.small} className="img-fluid" alt="" /> : 
                                                <img src={configData.NO_BLOG_IMAGE} className="img-fluid"/>
                                                }                                                
                                            </div>
                                        </Link>
                                        <div className="blog-details">
                                            <h4>{Moment(blog.createdOn).format('Do MMMM YYYY')}</h4>
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details/${blog._id}`}>
                                                <p>{blog.title} </p></Link>
                                            <hr className="style1" />
                                                <h6>by:{blog.username}</h6>
                                        </div>
                                    </div>

                        </div>
                    )}

                            </Slider>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.blogInfo.blogs
    }
}

export default connect(mapStateToProps) (BlogSection);