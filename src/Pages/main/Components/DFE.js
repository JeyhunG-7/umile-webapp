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
                        {/* <h3>Designed for Everyone</h3> */}
                        <h3>Features</h3>

                        <div className="dfe-body">
                            <div className="dfe-body-1">
                                <div className="lottie">
                                    <DynamicIcon type="dfe_1" height='300' loop={true} />
                                </div>
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Easy-to-Use Platform</h4>
                                    <p className="dfe-txt-body">Delivery orders can be submitted in a couple of clicks via UMile Web Platform.</p>
                                </div>
                            </div>

                            {/* <div className="dfe-body-2">
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Shopify Integration <span class="coming-soon">Coming soon</span></h4>
                                    <p className="dfe-txt-body">We have created a plugin for your Shopify online store to take care of deliveries within the city.</p>
                                </div>
                                <div className="lottie">
                                    <img alt="shopify-integration" src={Shopify} style={{ height: 250, width: 'auto' }} />
                                </div>
                            </div> */}

                            {/* For any questions refer to Jey :D */}
                            <div className="dfe-body-2">
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Integrations <span class="coming-soon">Coming soon</span></h4>
                                    <p className="dfe-txt-body">Seemless intergrations with your online marketplaces</p>
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
                                    <h4 className="dfe-desc-hdr">Package tracking <span class="coming-soon">Coming soon</span></h4>
                                    <p className="dfe-txt-body">Track your orders and their statuses any time, any place</p>
                                </div>
                            </div>

                            {/* <div className="dfe-body-3">
                                <div className="lottie">
                                    <DynamicIcon type="dfe_3" width='300' loop={true} />
                                </div>
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Powerful APIs</h4>
                                    <p className="dfe-txt-body">Your development team is enabled to integrate UMile’s delivery functionality into your own apps and websites.</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
}