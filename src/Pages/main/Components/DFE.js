import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';
import Shopify from '../../../Images/shopify_integration.png';
import API from '../../../Images/api_integration.png';
import EasyToUse from '../../../Images/dfe-easy-to-use.png';

export default function DesignedForEveryone(props) {

    function handleScrollToContactUs(){
        props.handleScrollToContactUs();
    }

    return (
        <>
            <Fade>
                <section className="sec-dfe">
                    <div className="div-dfe">
                        <h3>UMile is designed for everyone</h3>
                        <div className="dfe-body">
                            <div className="dfe-body-1a">
                                <div className="dfe-body-1b">
                                    <div className="lottie">
                                        {/* <DynamicIcon type="dfe_1" height='300' loop={true} /> */}
                                        <img slt="easy-to-use" src={EasyToUse} style={{width: 300, height: 'auto'}}/>
                                    </div>
                                    <div className="dfe-desc">
                                        <h4 className="dfe-desc-hdr">Easy-to-use platform</h4>
                                        <p className="dfe-txt-body">Delivery orders can be submitted in a couple of clicks via UMile Web Platform.</p>
                                        <button className="learn-more" onClick={handleScrollToContactUs}>Learn More</button>
                                    </div>
                                </div>
                            </div>

                            <div className="dfe-body-2a">
                                <div className="dfe-body-2b">
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">Shopify integration <span className="coming-soon">Coming soon</span></h4>
                                    <p className="dfe-txt-body">We have created a plugin for your Shopify online store to take care of deliveries within city of Calgary.</p>
                                    <button className="learn-more" onClick={handleScrollToContactUs}>Learn More</button>
                                </div>
                                <div className="lottie">
                                    <img alt="shopify-integration" src={Shopify} style={{ height: 250, width: 'auto', display: 'flex', margin: 'auto' }} />
                                </div>
                            </div>
                            </div>

                            <div className="dfe-body-3a">
                                <div className="dfe-body-3b">
                                <div className="lottie">
                                    <img alt="shopify-integration" src={API} style={{ height: 250, width: 'auto', display: 'flex', margin: 'auto' }} />
                                </div>
                                <div className="dfe-desc">
                                    <h4 className="dfe-desc-hdr">API integration <span className="coming-soon">Coming soon</span></h4>
                                    <p className="dfe-txt-body">Your development team is enabled to integrate UMile’s delivery functionality into your own apps and websites.</p>
                                    <button className="learn-more" onClick={handleScrollToContactUs}>Learn More</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
}