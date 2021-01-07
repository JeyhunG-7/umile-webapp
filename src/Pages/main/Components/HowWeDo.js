import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function HowWeDo(props) {

    return (

        <Fade>
            <section id="how-we-do" className="how-we-do-container">
                <div className="how-we-do-div">
                    <h3>Streamlining city-wide delivery</h3>
                    <div className="steps">
                        <ul className="step-1">
                            <li className="lottie">
                                <DynamicIcon type="hwd_3" width='100' height='110' loop={false}/>
                            </li>
                            <li className="hdr">Technology-first approach </li>
                            <li className="text">We leverage technology such as APIs and Shopify integration to eliminate manual order submission.</li>
                        </ul>
                        <ul className="step-2">
                            <li className="lottie">
                                <DynamicIcon type="hwd_3" width='110' height='110' loop={false}/>
                            </li>
                            <li className="hdr">Next day delivery</li>
                            <li className="text">We provide B2B and B2C next day delivery services for small and medium size businesses in Calgary. </li>
                        </ul>
                        <ul className="step-3">
                            <li className="lottie">
                                <DynamicIcon type="hwd_3" width='110' height='110' loop={false}/>
                            </li>
                            <li className="hdr">Customer Satisfaction</li>
                            <li className="text">Your customer's satisfaction is as important as your own - we are here to take care of you both.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </Fade>

    );
}