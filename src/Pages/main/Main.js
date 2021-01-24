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
    const screenX = window.screen.width;

    const contactUs = useRef();
    const pricing = useRef();
    const about = useRef();

    function handleNavToSection(val){
        if(val === 'contact'){
            contactUs.current.scrollIntoView({ behavior: 'smooth', block: (screenX > 600 ? 'center' : 'start') });
        } else if(val === 'about'){
            about.current.scrollIntoView({ behavior: 'smooth', block: (screenX > 600 ? 'center' : 'start') });
        } else if(val === 'pricing'){
            pricing.current.scrollIntoView({ behavior: 'smooth', block: (screenX > 600 ? 'center' : 'start') });
        }
    }

    return (
        <div id="main" className="main main-page">
            <Header pageName={props.pageName} showNav={true} navToSection={handleNavToSection}/>
            <div className="bg-square"></div>
            <Intro navToSection={handleNavToSection}/>
            <HowWeDo ref={about}/>
            <DesignedForEveryone navToSection={handleNavToSection}/>
            <Pricing ref={pricing}/>
            <ContactUs ref={contactUs}/>
            <Footer />
        </div>
    );
}