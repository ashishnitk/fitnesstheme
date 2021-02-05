import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import configData from '../../config.json'
import Slider from 'react-slick';


class GalleryListItem extends Component {
    
    render() {
        const { album } = this.props;
        return (
            <div>
            <div className="product-box">
                <div className="img-wrapper">
                    <div className="front">
                            <img src={(album.images).length ?
                                album.images[0].image.medium : configData.NO_BLOG_IMAGE}
                                className="img-fluid"
                                alt="" />
                    </div>
                    </div>
                </div>
                {/* <div style={{padding:"0 30px"}}> */}
                <div>
                    <br></br>
                    {
                        (album.images).length ? 
                        <Link to={`${process.env.PUBLIC_URL}/gallery/details/${album._id}`} >
                        <button className="btn btn-solid">View Album {album.name}</button>
                        </Link> : <button className="btn btn-solid">View Album {album.name}</button>
                    }

                                         
                </div>
                
                 </div>
        )
    }
}

export default GalleryListItem;