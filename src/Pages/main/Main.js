import React, { useRef } from 'react'
import './Main.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Intro from './Components/Intro';
import UniPlatform from './Components/UniPlatform';
import DesignedForEveryone from './Components/DFE';
import ContactUs from './Components/ContactUs';

export default function Main(props) {
    const contactUs = useRef();

    function handleScrollToContactUs(){
        contactUs.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div id="main" className="main">
            <Header pageName={props.pageName} />
            <Intro handleScrollToContactUs={handleScrollToContactUs}/>
            <UniPlatform />
            <DesignedForEveryone handleScrollToContactUs={handleScrollToContactUs}/>
            <ContactUs ref={contactUs}/>
            <Footer />
        </div>
    );
}