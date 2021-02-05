import React, {Component} from 'react';
import {Helmet} from 'react-helmet'
import { connect } from 'react-redux'
import {Link, Redirect } from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import SimpleReactValidator from 'simple-react-validator';
import configData from '../../config.json'
import Breadcrumb from "../common/breadcrumb";
import {removeFromWishlist} from '../../actions'
import {getCartTotal} from "../../services";
import axiosInstance from '../../services/interceptor'
import { toast } from 'react-toastify';

class placeOrder extends Component {

    constructor (props) {
        super (props)

        this.state = {
            first_name:'',
            last_name:'',
            phone:'',
            altphone:'',
            email:'',
            country:'',
            address:'',
            landmark:'',
            city:'',
            state:'',
            pincode:'',
            isHomeAddress: true
        }
        this.validator = new SimpleReactValidator();
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

      }

      setStateFromCheckbox = (event) => {
          var obj = {};
          obj[event.target.name] = event.target.checked;
          this.setState(obj);

          if(!this.validator.fieldValid(event.target.name))
          {
              this.validator.showMessages();
          }
        }

    checkhandle(value) {
        this.setState({
            payment: value
        })
    }

    StripeClick = () => {

        if (this.validator.allValid()) {
            alert('You submitted the form and stuff!');

            var handler = (window).StripeCheckout.configure({
                key: 'pk_test_glxk17KhP7poKIawsaSgKtsL',
                locale: 'auto',
                token: (token: any) => {
                    console.log(token)
                      this.props.history.push({
                          pathname: '/order-success',
                              state: { payment: token, items: this.props.cartItems, orderTotal: this.props.total, symbol: this.props.symbol }
                      })
                }
              });
              handler.open({
                name: 'Multikart',
                description: 'Online Fashion Store',
                amount: this.amount * 100
              })
        } else {
          this.validator.showMessages();
          // rerender to show messages for the first time
          this.forceUpdate();
        }
    }

    PlaceOrder = () => {
        let products = []
            for(var i = 0; i < (this.props.cartItems).length; i++) {
                let data = {
                    productId: this.props.cartItems[i]._id,
                    name:  this.props.cartItems[i].name,
                    imageUrl: this.props.cartItems[i].primaryImage.actual,
                    price: this.props.cartItems[i].price,
                    quantity: this.props.cartItems[i].qty,
                    discount: this.props.cartItems[i].discount,
                }
                products.push(data)
            }
        if (products.length) {
            axiosInstance({
                method: 'post',
                url: `${configData.NEW_API_URL}/Carts/consumer/${localStorage.getItem("consumerId")}`,
                data: products,
                headers: {
                    'content-type': 'application/json'
                }
            }).then((response)=>{
                if (response.status === 200) {
                    let payload = {
                        consumerId: localStorage.getItem("consumerId"),
                        merchantId: this.props.userProfile._id
                    }
                    axiosInstance({
                        method: 'post',
                        url: `${configData.NEW_API_URL}/Guests/order`,
                        data: payload,
                        headers: {
                            'content-type': 'application/json'
                        }
                    }).then((response)=>{
                        if (response.status === 200) {
                            window.location.href = response.data                            
                        }
                    }).catch (error => {       
                        toast.error("Oops Payment Issue... Please try again !!!")                       
                    }) 

                }
            }).catch (error => {       
                toast.error("Something went wrong !!!")                       
            })            
        }
        else {
            console.log("error")
        }

    }

    render (){
        const {cartItems, symbol, total, userProfile} = this.props;
        const { address } = this.props.location.state

        return (
            <div>

                {/*SEO Support*/}
                <Helmet>
                    <title>{userProfile.name} | PlaceOrder Page</title>
                    <link id="favicon" rel="shortcut icon" type="image/x-icon" href={userProfile.favImage.small} sizes="16X16" />
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb  title={'Place-Order'}/>

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-10 col-sm-12 col-xs-12">
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Product <span> Total</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {cartItems.map((item, index) => {
                                                            return <li key={index}>{item.name} × {item.qty} <span>{symbol}{item.sum}</span></li> })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Subtotal <span className="count">{symbol}{total}</span></li>
                                                    </ul>

                                                    <ul className="total">
                                                        <li>Total <span className="count">{symbol}{total}</span></li>
                                                    </ul>

                                                    <h4>shipping address</h4>
                                                    <ul className="order-detail">
                                                        <li>{address.firstName} {address.lastName}</li><br/>
                                                        <li>{address.streetAddress}</li><br/>
                                                        <li>Landmark - {address.landmark}</li><br/>
                                                        <li>{address.city}, {address.state} - {address.zipCode}</li><br/>
                                                        <li>Contact No. {address.mobileNumber}</li><br/>
                                                        <li>Email - {address.emailId}</li><br/>
                                                        <li>Contact No. {address.mobileNumber}</li><br/>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    <div className="upper-box">
                                                    </div>
                                                    {(total !== 0)?
                                                    <div className="text-right">
                                                         <button type="button" className="btn-solid btn" onClick={() => this.PlaceOrder()} >Place Order</button>
                                                    </div>
                                                    : ''}
                                                </div>
                                            </div>
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
    cartItems: state.cartList.cart,
    userProfile: state.userInfo.user,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart)
})

export default connect(
    mapStateToProps,
    {removeFromWishlist}
)(placeOrder)