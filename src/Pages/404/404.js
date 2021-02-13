import React from 'react';
import './404.css';
import Fade from 'react-reveal/Fade';
import { Helmet } from 'react-helmet';

import LogoTransperent from '../../Images/logo_transparent.png';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';


export default function NotFound(props) {
    const screenX = window.screen.width;

    return (
        <>
            <Helmet>
                <title>{'UMile | 404'}</title>
            </Helmet>
            <div id="main" className="main not-found">
                <div className="div-logo">
                    <a href="https://dashboard.umile.xyz/">
                        <img alt="logo" src={LogoTransperent} />
                    </a>
                </div>
                <div className="bg-square"></div>
                <div className="body">
                    <div className="sec-404">
                        <DynamicIcon type="notFound" width={screenX > 600 ? '400' : '300'} height={screenX > 600 ? '280' : '210'} />
                        <Fade>
                            <h2>Page Not Found</h2>
                            <p>Sorry, this page could not be found. You may want to check <a href="/">homepage</a>.</p>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    );
}