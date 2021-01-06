import React from 'react';
import './Main.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Intro from './Components/Intro';
import UniPlatform from './Components/UniPlatform';
import DesignedForEveryone from './Components/DFE';
import ContactUs from './Components/ContactUs';

export default function Main(props) {

    return (
        <div id="main" className="main">
            <Header pageName={props.pageName} />
            <Intro />
            <UniPlatform />
            <DesignedForEveryone/>
            <ContactUs/>
            <Footer />
        </div>
    );
}