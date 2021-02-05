import React, { Component } from 'react';
import configData from '../../../../config.json'

export default class ImageZoom extends Component {
    render() {
        const {image} = this.props;

        return (
            <img src={image?image.large : configData.NO_PRODUCT_IMAGE}  className="img-fluid image_zoom_cls-0" />
        );
    }
}