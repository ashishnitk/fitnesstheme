import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import { withTranslate } from 'react-redux-multilingual'
import { connect } from "react-redux";

// Custom Components
import HeaderOne from './common/headers/header-one';

import FooterOne from "./common/footers/footer-one";

// ThemeSettings
import ThemeSettings from "./common/theme-settings"
import { ToastContainer } from 'react-toastify';



class App extends Component {

    render() {

        const { favImage, storeName } = this.props

        return (
            <div>
                <Helmet>
                    <title>{storeName}</title>
                    <link id="favicon" rel="shortcut icon" type="image/x-icon" href={favImage.small} sizes="16X16" />
                </Helmet>
                <HeaderOne logoName={'layout3/logo.png'} />
                {this.props.children}
                <FooterOne logoName={'layout3/logo.png'} />
                <ToastContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        storeName: state.userInfo.user.name,
        favImage: state.userInfo.user.favImage
    }
}

export default connect(mapStateToProps)(withTranslate(App));
