import React from 'react';
import './Contact.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function Contact(props) {
    const screenX = window.screen.width;

    return (
        <>
            <div className="main contact">
                <Header pageName={props.pageName}/>
                <div className="body">
                    <div className="sec-contact">
                        <DynamicIcon type="contactUs" width={screenX > 600 ? '425' : '300'} height={screenX > 600 ? '425' : '300'}/>
                        <Fade>
                            <div className="email">
                                <i className="far fa-envelope"></i>
                                <a href="mailto:info@arvel.app">Info@UMile.xyz</a>
                            </div>
                            <p>650 California St, San Francisco, CA 94108, United States</p>
                        </Fade>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}