import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function UniPlatform() {

    return (
        <>
            <Fade>
                {/* <section className="sec-uni-platform">
                    <div className="div-uni-platform">
                        <h3>Unified Platform</h3>
                        <div className="up-body">
                            <div className="up-desc">
                                <h4 className="up-desc-hdr">Fully integrated suite of delivery handling products</h4>
                                <p className="up-txt-body">We bring together everything that’s required to build websites and apps that need to deliver
                                orders within city limits. UMile empowers deliveries for businesses of all sizes.</p>
                            </div>
                            <div className="lottie">
                                <DynamicIcon type="unifiedPlatform" width='364' loop={true} />
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="sec-uni-platform">
                    <div className="div-uni-platform">
                        <h3>Services</h3>
                        <div className="up-body">
                            <div className="up-desc">
                                <ul>
                                    <li>B2B and B2C delivery logistics</li>
                                    <li>Online Platform</li>
                                    <li>Next day delivery</li>
                                </ul>
                            </div>
                            <div className="lottie">
                                <DynamicIcon type="unifiedPlatform" width='364' loop={true} />
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
}