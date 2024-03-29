import React, {Component} from 'react';
import { resetCart, fetchOrderStatus } from '../../actions';
import store from '../../store'


class orderSuccess extends Component {

    constructor (props) {
        super (props)

    }
    componentDidMount() {

        store.dispatch(resetCart())
        let orderId = this.props.match.params.id
        store.dispatch(fetchOrderStatus(orderId))
    }

    render (){

        // const {payment, items, symbol, orderTotal} = this.props.location.state;
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var current = new Date();
        var next5days = new Date(Date.now() + 5 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString()
        let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()

        return (
            (localStorage.getItem("orderStatus") == "Success")?
            <div>
                <section className="section-b-space light-layout">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="success-text">
                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    <h2>thank you</h2>
                                    <p>Payment Is Received and Order Placed Successfully</p>
                                    <p>Reference ID: {this.props.match.params.id}</p>
                                    <p>Support Email: support@ewns.in</p>
                                    <p>Support Contact: +91 90325 26393</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-order">
                                    <h3>your order details</h3>
                                    {items.map((item, index) => {
                                    return <div className="row product-order-detail" key={index}>
                                                <div className="col-3">
                                                    <img src={item.variants?
                                                        item.variants[0].images
                                                        :item.pictures[0]} alt="" className="img-fluid" />
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>{symbol}{item.sum}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                    <div className="total-sec">
                                        <ul>
                                            <li>subtotal <span>{symbol}{orderTotal}</span></li>
                                            <li>shipping <span>$0</span></li>
                                            <li>tax(GST) <span>$0</span></li>
                                        </ul>
                                    </div>
                                    <div className="final-total">
                                        <h3>total <span>{symbol}{orderTotal}</span></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row order-success-sec">
                                    <div className="col-sm-6">
                                        <h4>summery</h4>
                                        <ul className="order-detail">
                                            {(payment.paymentID)?
                                                <div>
                                            <li>payer ID: {payment.payerID}</li>
                                            <li>payment ID: {payment.paymentID}</li>
                                            <li>payment Token: {payment.paymentToken}</li></div>
                                                :
                                            <li>Order ID: {payment.id}</li> }

                                            <li>Order Date: {CheckDate}</li>
                                            <li>Order Total: {symbol}{orderTotal}</li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>shipping address</h4>
                                        <ul className="order-detail">
                                            <li>gerg harvell</li>
                                            <li>568, suite ave.</li>
                                            <li>Austrlia, 235153</li>
                                            <li>Contact No. 987456321</li>
                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net
                                            banking acceptance subject to device availability.</p>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery</h3>
                                            <h2>{deliveryDate}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section> */}
            </div>
            :
            <div>
            <section className="section-b-space light-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="error-text">
                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                <p>Something went wrong !!!</p>
                                <p>Reference ID: {this.props.match.params.id}</p>
                                <p>Please email: support@ewns.in for assistance</p>
                                {/* <a href="index.html" className="btn btn-solid">back to home</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        )
    }
}

export default orderSuccess