import React, { useRef } from 'react'
import './Main.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Intro from './Components/Intro';
import DesignedForEveryone from './Components/DFE';
import ContactUs from './Components/ContactUs';
import HowWeDo from './Components/HowWeDo';
import Pricing from './Components/Pricing';

export default function Main(props) {
    const contactUs = useRef();

    function handleScrollToContactUs(){
        contactUs.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div id="main" className="main main-page">
            <Header pageName={props.pageName} />
            <div className="bg-square"></div>
            <Intro handleScrollToContactUs={handleScrollToContactUs}/>
            <HowWeDo/>
            <DesignedForEveryone handleScrollToContactUs={handleScrollToContactUs}/>
            <Pricing/>
            <ContactUs ref={contactUs}/>
            <Footer />
        </div>
    );
}