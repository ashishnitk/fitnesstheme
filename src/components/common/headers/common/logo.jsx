import React from 'react';
import {Link} from 'react-router-dom'

function LogoImage(props) {

    return <Link to={`${process.env.PUBLIC_URL}/`} >
                <img src={props.logo} alt="" className="img-fluid" width='35%' height='35%' />
            </Link>;
}

export default LogoImage;