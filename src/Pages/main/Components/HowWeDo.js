import React from 'react';
import './HowWeDo.css';
import Fade from 'react-reveal/Fade';

// Sourced from icons8.com
import step1 from '../../../Images/main-steps-1.png';
import step2 from '../../../Images/main-steps-2.png';
import step3 from '../../../Images/main-steps-3.png';

const HowWeDo = React.forwardRef((props, ref) => {

    return (
        <Fade>
            <section id="how-we-do" className="how-we-do-container">
                <div className="how-we-do-div" ref={ref}>
                    <h3>Streamlining city-wide delivery</h3>
                    <div className="steps">
                        <ul className="step-1">
                            <li className="lottie">
                                <img src={step1}/>
                            </li>
                            <li className="hdr">Technology-first approach </li>
                            <li className="text">We leverage technology such as APIs and Shopify integration to eliminate manual order submission.</li>
                        </ul>
                        <ul className="step-2">
                            <li className="lottie">
                                <img src={step2}/>
                            </li>
                            <li className="hdr">Next day delivery</li>
                            <li className="text">We provide B2B and B2C next day delivery services for small and medium-size businesses in Calgary. </li>
                        </ul>
                        <ul className="step-3">
                            <li className="lottie">
                                <img src={step3}/>
                            </li>
                            <li className="hdr">Customer Satisfaction</li>
                            <li className="text">Your customer's satisfaction is as important as your own - we are here to take care of you both.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </Fade>
    );
});

export default HowWeDo;