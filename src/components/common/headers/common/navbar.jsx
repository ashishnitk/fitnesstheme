import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '0px' }
        }
    }

    componentWillMount() {
        if (window.innerWidth < 750) {
            this.setState({ navClose: { right: '-410px' } })
        }
        if (window.innerWidth < 1199) {
            this.setState({ navClose: { right: '-300px' } })
        }
    }

    openNav() {
        console.log('open')
        this.setState({ navClose: { right: '0px' } })
    }
    closeNav() {
        this.setState({ navClose: { right: '-410px' } })
    }

    onMouseEnterHandler() {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else{
            document.querySelectorAll('.nav-submenu').forEach(function (value) {
                value.classList.remove('opensubmenu');
            });
            // document.querySelector('.mega-menu-container').classList.remove('opensubmenu')
            event.target.nextElementSibling.classList.add('opensubmenu')
        }
    }

    render() {
        const { translate } = this.props;
        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav" >
                        <div className="toggle-nav" onClick={this.openNav.bind(this)} >
                            <i className="fa fa-bars sidebar-bar"></i>
                        </div>
                        <ul className="nav-menu" style={this.state.navClose}>
                            <li className="back-btn" onClick={this.closeNav.bind(this)} >
                                <div className="mobile-back text-right">
                                    <span >Back</span>
                                    <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                                </div>
                            </li>
                            <li >
                                <Link to={`${process.env.PUBLIC_URL}`} className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('home')}
                                </Link>
                            </li>
                            <li >
                                <Link to="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('shop')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/shop/collection`} >products</Link></li>
                                </ul>
                            </li>
                            <li >
                                <Link to={`${process.env.PUBLIC_URL}/blog/collection`}>
                                    {translate('blog')}
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('pages')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/about-us`} >{translate('about_us')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/gallery/collection`}>image gallery</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/faq`} >{translate('FAQ')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/login`} >{translate('login')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/register`} >{translate('register')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/forget-password`} >{translate('forget_password')}</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to={`${process.env.PUBLIC_URL}/contact`}>
                                    {translate('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(NavBar);