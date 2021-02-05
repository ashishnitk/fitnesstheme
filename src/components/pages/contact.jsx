import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import { connect } from 'react-redux'
import axiosInstance from '../../services/interceptor'
import configData from '../../config.json'
import { toast } from 'react-toastify';

class Contact extends Component {

    constructor (props) {
        super (props)
        this.state = {
            websiteName:'',
            firstName: '',
            lastName: '',
            phone:'',
            email:'',
            message:''
        }
    }

    onFirstNameChange(event) {
        this.setState({firstName: event.target.value})
    }

    onLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    onPhoneChange(event) {
        this.setState({phone: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    handleSubmit( event ) {
        event.preventDefault();
        let from = this.state.email + " " + this.state.phone
        let contactName = this.state.firstName + " " + this.state.lastName
        let data = {
            websiteName: this.state.websiteName,
            from: from,
            message: this.state.message,
            contactName: contactName,
            email: this.state.email
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
        this.setState({firstName: '', lastName: '', phone: '', email: '', message: ''})
    }


    componentDidMount() {
        const { userProfile } = this.props
        this.setState({websiteName: userProfile.username})
    }

    render (){

        const { userProfile } = this.props
        return (
            
            <div>
                <Breadcrumb title={'Contact Us'}/>
                
                
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyArMCEufdpTmWN9VVA4z9gj3I9pPbr4fDQ&q=${userProfile.lat},${userProfile.lng}`}
                                    allowFullScreen></iframe>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/phone.png`} alt="Generic placeholder image" />
                                                    <h6>Contact Us</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>{userProfile.countryCode} {userProfile.mobileNumber}</p>
                                                {/* <p>+86 163 - 451 - 7894</p> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Address</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>{userProfile.address}</p>
                                                <p>{userProfile.locality}, {userProfile.city}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                    <h6>Email</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>{userProfile.email}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form id="contact-form" className="theme-form" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="name" value={this.state.firstName}
                                                onChange={this.onFirstNameChange.bind(this)}   placeholder="First Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Last Name</label>
                                            <input type="text" className="form-control" id="last-name" value={this.state.lastName}
                                                onChange={this.onLastNameChange.bind(this)}   placeholder="Last Name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Phone number</label>
                                            <input type="text" className="form-control" id="review" value={this.state.phone}
                                                onChange={this.onPhoneChange.bind(this)}   placeholder="Enter your number" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email" value={this.state.email}
                                                onChange={this.onEmailChange.bind(this)}   required />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-control" placeholder="Write Your Message" value={this.state.message}
                                                    onChange={this.onMessageChange.bind(this)}  id="exampleFormControlTextarea1" rows="6" required></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Send Your Message</button>
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

const mapStateToProps = (state) => ({
    userProfile: state.userInfo.user 
})

export default connect(mapStateToProps) (Contact)