import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';
import Shopify from '../../../Images/shopify_integration.png';

export default function DesignedForEveryone(props) {

    return (
        <>
            <Fade>
                <section className="sec-dfe">
                    <div className="div-dfe">
                        <h3>Designed for Everyone</h3>

                        <div className="dfe-body">
                            <div className="dfe-body-1">
                                <div className="lottie">
                                    <DynamicIcon type="dfe_1" height='300' loop={true} />
                                </div>
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Easy-to-Use Platform</h4>
                                    <p className="dfe-txt-body">Delivery orders can be submitted in a couple of clicks via UMile platform.</p>
                                </div>
                            </div>

                            <div className="dfe-body-2">
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Shopify Integration</h4>
                                    <p className="dfe-txt-body">We have created a plugin for your Shopify online store to take care of deliveries within the city.</p>
                                </div>
                                <div className="lottie">
                                    <img alt="shopify-integration" src={Shopify} style={{ height: 250, width: 'auto' }} />
                                </div>
                            </div>

                            <div className="dfe-body-3">
                                <div className="lottie">
                                    <DynamicIcon type="dfe_3" width='300' loop={true} />
                                </div>
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Powerful APIs</h4>
                                    <p className="dfe-txt-body">Your development team is enabled to integrate UMile’s delivery functionality into your own apps and websites.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
}