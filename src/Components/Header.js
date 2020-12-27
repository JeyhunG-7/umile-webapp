import React from 'react';
import { Helmet } from 'react-helmet';
import './Components.css';
import LogoTransperent from '../Images/logo_transparent.png';


export default function Header(props) {

    return (
        <>
            <Helmet>
                <title>{'UMile | ' + props.pageName}</title>
            </Helmet>
            <nav className="header">
                <div className="hdr-body">
                    <a href="/" className="a-logo">
                        <img src={LogoTransperent} alt="Transperent Logo" />
                    </a>
                    <div className="body-sub-2">
                        <a href="/contact" className="page-link">Contact Us</a>
                        <a href="/sign" className="page-link">Sign In</a>
                    </div>
                </div>
            </nav>
        </>
    );
}