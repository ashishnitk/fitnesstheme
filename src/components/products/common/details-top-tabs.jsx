import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {Link} from 'react-router-dom'
import axiosInstance from '../../../services/interceptor'
import configData from '../../../config.json'
import { toast } from 'react-toastify';

class DetailsTopTabs extends Component {

    constructor (props) {
        super (props)
        this.state = {
            websiteName:'',
            firstName: '',
            lastName: '',
            email:'',
            message:'',
            productId: ''
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
        let contactName = this.state.firstName + " " + this.state.lastName
        let data = {
            websiteName: this.state.websiteName,
            from: contactName,
            message: this.state.message,
            contactName: contactName,
            email: this.state.email,
            productId: this.state.productId
        }
        //console.log(data)
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
        this.setState({websiteName: item.username, productId: item.name})
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.item.name !== prevProps.item.name) {
          this.resetForm()
          this.setState({productId: this.props.item.name});
        }
    }
    
    render (){

        const {item} = this.props

        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                {/* <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab> */}
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Contact Us</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            {/* <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                    <tr>
                                        <th>Ideal For :</th>
                                        <td>Women's</td>
                                    </tr>
                                    <tr>
                                        <th>Pattern :</th>
                                        <td>Embroidered</td>
                                    </tr>
                                    <tr>
                                        <th>Dress Fabric :</th>
                                        <td>Silk</td>
                                    </tr>
                                    <tr>
                                        <th>Type :</th>
                                        <td>Ghagra, Choli, Dupatta Set</td>
                                    </tr>
                                    <tr>
                                        <th>Neck :</th>
                                        <td>Round Neck</td>
                                    </tr>
                                    <tr>
                                        <th>Sleeve :</th>
                                        <td>3/4 Sleeve</td>
                                    </tr>
                                    <tr>
                                        <th>Work :</th>
                                        <td>N/A</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </TabPanel> */}
                            <TabPanel>
                                <p className="mt-4 p-0" dangerouslySetInnerHTML={{ __html: item.description }}>
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <form id="product-contact-form" className="theme-form mt-4" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="First Name"
                                            value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="text" className="form-control" id="last-name" placeholder="Last Name"
                                            value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                            value={this.state.email} onChange={this.onEmailChange.bind(this)} required />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label htmlFor="email">Product</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                            value={item.name} required />
                                        </div> */}
                                        <div className="col-md-12">
                                            <label htmlFor="review">Review</label>
                                            <textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" 
                                            value={this.state.message} onChange={this.onMessageChange.bind(this)} rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Submit YOur Review</button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;