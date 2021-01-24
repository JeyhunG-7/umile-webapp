import React from 'react';
import { Helmet } from 'react-helmet';
import './Components.css';
import LogoTransperent from '../Images/logo_transparent.png';


export default function Header(props) {

    function handleNavToSection(val) {
        props.navToSection(val);
    }

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
                        {
                            props.showNav
                                ? <>
                                    <button className="sec-link-btn about" onClick={() => handleNavToSection('about')}>About</button>
                                    <button className="sec-link-btn" onClick={() => handleNavToSection('pricing')}>Pricing</button>
                                    <button className="sec-link-btn" onClick={() => handleNavToSection('contact')}>Contact us</button>
                                </>
                                : <>
                                    <a href="/" className="page-link">Home</a>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}