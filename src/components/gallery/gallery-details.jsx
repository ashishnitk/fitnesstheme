import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import {connect} from "react-redux";
import Slider from 'react-slick';

class GalleryDetails extends Component {

    render (){

        const { item } = this.props
        let title = 'Album - ' + item.name

        return (
            <div>
                <Breadcrumb title={title}/>
                
                
                <section className="section-b-space">
                    <Slider className="slide-1 home-slider">
                        {(item.images).map((banner, index) =>
                            <div key={index}>
                                <div className="home">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="slider-contain">
                                                    <img src={banner.image.actual} className="img-fluid" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </Slider>
                </section>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let albumId = ownProps.match.params._id;
    return {
        item: state.galleryInfo.albums.find(el => el._id == albumId),
    }
}

export default connect(mapStateToProps) (GalleryDetails)