import React from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';
import IntroImg from '../../../Images/main-intro.png';

export default function Intro(props) {
    const screenX = window.screen.width;

    function handleScrollToContactUs() {
        props.handleScrollToContactUs();
    }

    return (
        <>

            <Fade>
                <section className="intro-container">
                    <div className="intro-div">
                        <div className="intro-text">
                            <h3>City-Wide delivery is simplified</h3>
                            <p>We bring together everything that’s required to process your orders for delivery within city of Calgary. 
                                UMile empowers deliveries for businesses of small and medium sizes.</p>
                            <button className="start" onClick={handleScrollToContactUs}>Get started</button>
                        </div>
                        <div className="intro-lottie">
                            <img alt="intro" src={IntroImg} style={{width: 525, height: 'auto', display: 'flex', marginLeft: 'auto'}}/>
                            {/* <DynamicIcon type="introMain" width={screenX > 600 ? '527' : '300'} height={screenX > 600 ? '530' : '298'} /> */}
                        </div>
                        <div className="bg-square"></div>
                    </div>
                </section>
            </Fade>
        </>
    );
}