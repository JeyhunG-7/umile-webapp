import React from 'react';
import './404.css';
import Header from '../../Components/Header';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';
import Footer from '../../Components/Footer';

export default function NotFound(props) {
    const screenX = window.screen.width;

    return (
        <div id="main" className="main">
            <Header pageName={props.pageName} />
            <div className="body">
                <div className="sec-404">
                    <DynamicIcon type="notFound" width={screenX > 600 ? '400' : '300'} height={screenX > 600 ? '280' : '210'} />
                    <Fade>
                        <h2>Page Not Found</h2>
                        <p>Sorry, this page could not be found. You may want to check <a href="/">homepage</a>.</p>
                    </Fade>
                </div>
            </div>
            <Footer/>
        </div>
    );
}