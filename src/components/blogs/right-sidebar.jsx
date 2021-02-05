import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import Moment from 'moment'
import PageNotFound from '../pages/404'
import { getLatestFiveProducts } from "../../services"
import configData from '../../config.json'
class RightSidebar extends Component {

    constructor (props) {
        super (props)
    }

    render (){
        
        const { items, latestProducts, symbol } = this.props

        return (
            <div>
                <Breadcrumb title={'Blog'}/>
                
                
                {/*Blog Right Sidebar section*/}
                {items.length ?
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row"> 
                        <div className="col-xl-1"></div>
                            <div className="col-xl-6">
                            {items.map((blog, index) =>
                                <div className="row blog-media" key={index}>
                                    <div className="col-xl-7">
                                        {blog.imageModel ?                                       
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details/${blog._id}`} >
                                                <img src={blog.imageModel.medium} className="img-fluid" alt=""/></Link>
                                        </div>
                                        : 
                                        <div className="blog-left">
                                            <Link to={`${process.env.PUBLIC_URL}/blog/details/${blog._id}`} >
                                                <img src={configData.NO_BLOG_IMAGE} className="img-fluid" alt=""/></Link> 
                                        </div>
                                        }
                                    </div>
                                        {/* <div className="blog-right"> */}
                                        <div className="col-xl-4">
                                            <div className="blog-right">
                                                <div>
                                                <h6>{Moment(blog.createdOn).format('DD MMM YYYY')}</h6>
                                                <Link to={`${process.env.PUBLIC_URL}/blog/details/${blog._id}`} ><h4>{blog.title}</h4></Link>
                                                <ul className="post-social">
                                                    <li>Posted By : {blog.username}</li>
                                                    {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                                </ul>
                                                </div>
                                                {/* <p>{blog.description}</p> */}
                                            </div>
                                        {/* </div> */}
                                    </div>
                                   
                            </div> )}
                            </div>
                            <div className="col-xl-1">
                            </div>



                            <div className="col-xl-4 col-lg-4 col-md-5">
                                <div className="blog-sidebar">
                                    <div className="theme-card">
                                        <h4>Latest Products</h4>
                                        <ul className="recent-blog">
                                            <li>
                                                {latestProducts.map((product, index) => 
                                                <div className="media" key={index}>
                                                    <Link to={`${process.env.PUBLIC_URL}/collection/product/${product._id}`}><img className="img-fluid" src={product.primaryImage?product.primaryImage.small:configData.NO_PRODUCT_IMAGE} margin-top='10px' alt="Generic placeholder image" height="40%"/></Link>
                                                        <div className="media-body align-self-center">
                                                        <Link to={`${process.env.PUBLIC_URL}/collection/product/${product._id}`}><h6>{product.name}</h6></Link>
                                                            {product.price ? <p>{symbol}{product.price}</p> :
                                                            <Link to={`${process.env.PUBLIC_URL}/contact`}>
                                                            <>Ask For Price</>
                                                            </Link>}
                                                        </div>
                                                </div>)}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>: <PageNotFound/>}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    items: state.blogInfo.blogs,
    latestProducts: getLatestFiveProducts(state.data.products),
    symbol: state.data.symbol
})

export default connect(mapStateToProps) (RightSidebar)