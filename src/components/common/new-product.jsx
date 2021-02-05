import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import configData from '../../config.json'

import {getLatestFiveProducts} from "../../services";


class NewProduct extends Component {
    render (){
        const {items, symbol} = this.props;

        var arrays = [];
        while (items.length > 2) {
            arrays.push(items.splice(0, 3));
        }

        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                <div className="offer-slider slide-1">
                    {arrays.map((products, index) =>
                        <div key={index}>
                            {products.map((product, i) =>
                                <div className="media" key={i}>
                                    <Link to={`${process.env.PUBLIC_URL}/collection/product/${product._id}`}><img className="img-fluid" src={(product.secondaryImageModel).length?product.secondaryImageModel[0].small:configData.NO_PRODUCT_IMAGE} alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        <Link to={`${process.env.PUBLIC_URL}/collection/product/${product._id}`}><h5>{product.name}</h5></Link>
                                        {product.price ? product.discount ?  <h5>{symbol}{product.price-(product.price*product.discount/100)} <del><span className="money">{symbol}{product.price}</span></del></h5>
                                :
                                <h5>{symbol}{product.price-(product.price*product.discount/100)}</h5> :
                                <Link to={`${process.env.PUBLIC_URL}/contact`}>
                                <>Ask For Price</>
                                </Link>
                                }
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: getLatestFiveProducts(state.data.products),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, null)(NewProduct);
