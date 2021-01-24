import React from 'react';
import './Intro.css';
import Fade from 'react-reveal/Fade';
import IntroImg from '../../../Images/main-intro.png';

export default function Intro(props) {

    function handleNavToSection() {
        props.navToSection('about');
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
                            <button className="start" onClick={handleNavToSection}>Get started</button>
                        </div>
                        <div className="intro-lottie">
                            <img alt="intro" src={IntroImg}/>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
}