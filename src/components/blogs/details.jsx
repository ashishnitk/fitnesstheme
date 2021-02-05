import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from "react-redux";
import Moment from 'moment'
import configData from '../../config.json'
import axiosInstance from '../../services/interceptor'
import { toast } from 'react-toastify';

class BlogDetails extends Component {

    constructor (props) {
        super (props)
        this.state = {
            websiteName:'',
            firstName: '',
            lastName: '',
            email:'',
            message:'',
            productId:''
        }
    }

    onFirstNameChange(event) {
        this.setState({firstName: event.target.value})
    }

    onLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    handleSubmit( event ) {
        event.preventDefault();
        let from = this.state.email
        let contactName = this.state.firstName + " " + this.state.lastName
        let blogDetail = "Blog - " + this.state.productId
        let data = {
            websiteName: this.state.websiteName,
            from: from,
            message: this.state.message,
            contactName: contactName,
            email: this.state.email,
            productId: blogDetail
        }
        axiosInstance({
                method: 'post',
                url: `${configData.NEW_API_URL}/Internal/messages`,
                data: data,
                headers: {
                    'content-type': 'application/json'
                }
            }).then((response)=>{
                if (response.status === 201) {
                toast.success("Message Sent")
                this.resetForm()
                }
            }).catch (error => {       
                toast.error("Message failed to send")                       
            })            
    }

    resetForm(){
        this.setState({firstName: '', lastName: '', email: '', message: ''})
    }


    componentDidMount() {
        const { item } = this.props
        this.setState({websiteName: item.username, productId: item.title})
    }

    render (){

        const { item } = this.props

        return (
            <div>
                <Breadcrumb title={'Blog - Details'}/>
                
                
                {/*Blog Details section*/}
                <section className="blog-detail-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 blog-detail">
                                <h3>{item.title}</h3>
                                <ul className="post-social">
                                    <li>{Moment(item.createdOn).format('Do MMMM YYYY')}</li>
                                    <li>Posted By : {item.username}</li>
                                    {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                </ul>
                                <img src={item.imageModel ? item.imageModel.small : configData.NO_BLOG_IMAGE} className="img-fluid" alt=""/>
                                <div class="row">
                                    <div class="col-sm-12" dangerouslySetInnerHTML={{ __html: item.description }}>
                                        {/* <p>Fusce scelerisque augue a viverra semper. Etiam nisi nibh, vestibulum quis augue id,
                                            imperdiet fringilla dolor. Nulla sed nisl vel nisi cursus finibus. Vivamus ut augue
                                            nec justo viverra laoreet. Nunc efficitur, arcu ac cursus gravida, lorem elit
                                            commodo urna, id viverra libero tellus non ipsum. Fusce molestie ultrices nibh
                                            feugiat pretium. Donec pulvinar arcu metus, et dapibus odio condimentum id. Quisque
                                            malesuada mauris sit amet dui feugiat, ut pretium mauris luctus. Ut aliquam, tellus
                                            nec molestie condimentum, tellus arcu dignissim quam, a gravida nunc nulla vel
                                            magna. Sed pulvinar tortor et euismod blandit. Proin accumsan orci ac nunc fermentum
                                            vehicula.</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row section-b-space">
                            <div className="col-sm-12">
                                <ul className="comment-section">
                                </ul>
                            </div>
                        </div>
                        <div className="row blog-contact">
                            <div className="col-sm-12">
                                <h2>Leave Your Comment</h2>
                                <form id="blog-details-form" className="theme-form" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="first-name" value={this.state.firstName}
                                                onChange={this.onFirstNameChange.bind(this)}   placeholder="First Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="text" className="form-control" id="last-name" value={this.state.lastName}
                                                onChange={this.onLastNameChange.bind(this)}   placeholder="Last Name" required />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email" value={this.state.email}
                                                onChange={this.onEmailChange.bind(this)}   required />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Comment</label>
                                            <textarea className="form-control" placeholder="Write Your Comment" value={this.state.message}
                                                    onChange={this.onMessageChange.bind(this)}  id="exampleFormControlTextarea1" rows="6" required></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Post Comment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let blogId = ownProps.match.params._id;
    return {
        item: state.blogInfo.blogs.find(el => el._id == blogId),
    }
}

export default connect(mapStateToProps) (BlogDetails)