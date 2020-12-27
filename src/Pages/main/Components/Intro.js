import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function Intro(props) {
    const screenX = window.screen.width;

    function scrotTo() {
        console.log("girdi scroll to");
        // document.getElementById("how-works").scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    return (
        <>

            <Fade>
                <section className="intro-container">
                    <div className="intro-div">
                        <div className="intro-text">
                            <h3>City-Wide delivery is reinvented</h3>
                            <p>Thousands of businesses of all sizes—from local producers to large enterprises—imagine delivery as bottleneck for operations.
                                    Use UMile’s software and APIs to reimagine the delivery.</p>
                            <button className="start" onClick={scrotTo}>Get started</button>
                        </div>
                        <div className="intro-lottie">
                            <DynamicIcon type="introMain" width={screenX > 600 ? '527' : '300'} height={screenX > 600 ? '530' : '298'} />
                        </div>
                        <div className="bg-square"></div>
                    </div>
                </section>
            </Fade>
        </>
    );
}